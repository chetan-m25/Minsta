const postModel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model");
const saveModel = require("../models/save.model");

// Create ImageKit instance using private key from .env file
const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Controller to create a new post
async function createPostController(req, res) {
  // Check if file is uploaded
  if (!req.file) {
    return res.status(400).json({
      message: "Please upload an image",
    });
  }

  // Upload image file to ImageKit
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Image",
    folder: "insta-project/posts",
  });

  // Create new post in database
  const post = await postModel.create({
    caption: req.body.caption,
    imageUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post Created Successfully",
    post,
  });
}

// Get all posts of loggedIn user after verifying JWT token
async function getPostController(req, res) {
  // Extract user ID from decoded token
  const userId = req.user.id;

  // Find all posts created by this user
  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Posts Fetched Successfully",
    posts,
  });
}

// Get single post details if user is authorized
async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  // Find post by its ID
  const post = await postModel.findById(postId);

  // If post does not exist, return 404 error
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  // Allow only if post belongs to loggedIn user
  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  res.status(200).json({
    message: "Post Fetched Successfully",
    post,
  });
}

// Controller to like a post
async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  // Check if post exists
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  // Find like record for this user and post
  const like = await likeModel.findOne({
    post: postId,
    user: username,
  });

  // If user has already liked this post
  if (like) {
    return res.status(400).json({
      message: "User already liked this post",
    });
  }

  // Create like record for this user and post
  const likePost = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(201).json({
    message: "Post Liked",
    likePost,
  });
}

// Controller to unlike a post
async function unlikePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  // Check if post exists
  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  // Find like record for this user and post
  const like = await likeModel.findOne({
    post: postId,
    user: username,
  });

  // If user has not liked this post
  if (!like) {
    return res.status(400).json({
      message: "User not liked this post",
    });
  }

  // Delete the like record (unlike)
  await likeModel.findByIdAndDelete(like._id);

  res.status(200).json({
    message: "Post Unliked",
  });
}

// Controller to get feed of all posts with like status for loggedIn user
async function getFeedController(req, res) {
  const user = req.user;

  // Use Promise.all to wait for all posts to be processed with like status
  const posts = await Promise.all(
    (
      await postModel
        .find() // Fetch all posts
        .populate("user") // Populate user details for each post
        .lean() // Convert Mongoose documents to plain JavaScript objects
        .sort({ createdAt: -1 })
    ) // Sort posts by creation date in descending order

      // Map over each post to check if the loggedIn user has liked it
      .map(async (post) => {
        // count total likes
        const likesCount = await likeModel.countDocuments({ post: post._id });

        // Check if loggedIn user has liked this post
        const isLiked = await likeModel.findOne({
          user: user.username,
          post: post._id,
        });

        // count saved state for this user
        const isSaved = await saveModel.findOne({
          user: user.username,
          post: post._id,
        });

        // Add likesCount count, isLiked and isSaved property to post object
        post.likesCount = likesCount;
        post.isLiked = Boolean(isLiked);
        post.isSaved = Boolean(isSaved);

        return post; // Return the modified post object
      }),
  );

  res.status(200).json({
    message: "Posts Fetched Successfully",
    posts,
  });
}

// Controller to save a post (bookmark)
async function savePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const alreadySaved = await saveModel.findOne({
    post: postId,
    user: username,
  });

  if (alreadySaved) {
    return res.status(400).json({
      message: "Post already saved",
    });
  }

  const savedPost = await saveModel.create({
    post: postId,
    user: username,
  });

  res.status(201).json({
    message: "Post saved Successfully",
    savedPost,
  });
}

// Controller to unsave a post (remove bookmark)
async function unsavePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const saved = await saveModel.findOne({
    post: postId,
    user: username,
  });

  if (!saved) {
    return res.status(400).json({
      message: "Post not saved",
    });
  }

  await saveModel.findByIdAndDelete(saved._id);

  res.status(200).json({
    message: "Post unsaved successfully",
  });
}

// Controller to delete a post
async function deletePostController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  // Find post by its ID
  const post = await postModel.findById(postId);

  // If post does not exist, return 404 error
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  // Allow only if post belongs to loggedIn user
  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message: "You can only delete your own posts",
    });
  }

  // Delete the post
  await postModel.findByIdAndDelete(postId);

  // Delete all likes and saves associated with this post
  await likeModel.deleteMany({ post: postId });
  await saveModel.deleteMany({ post: postId });

  res.status(200).json({
    message: "Post deleted successfully",
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  unlikePostController,
  getFeedController,
  savePostController,
  unsavePostController,
  deletePostController,
};
