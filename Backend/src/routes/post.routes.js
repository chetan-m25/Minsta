const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const identifyUser = require("../middlewares/auth.middleware");
const uploadErrorHandler = require("../middlewares/uploadError.middleware");

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  // Filter to allow only image files
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image files are allowed"));
    } else {
      cb(null, true);
    }
  },
});

// Route to create a post with single image upload
postRouter.post(
  "/",
  upload.single("image"), // Upload one image from form field named "image"
  uploadErrorHandler,
  identifyUser,
  postController.createPostController, // Call controller to handle post creation
);

// Route to get all posts of loggedIn user
postRouter.get("/", identifyUser, postController.getPostController);

// Route to get details of a specific post by postId
postRouter.get(
  "/details/:postId",
  identifyUser, // Middleware to identify user from JWT token
  postController.getPostDetailsController,
);

// Route to like a post by postId
postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);

// Route to unlike a post by postId
postRouter.post(
  "/unlike/:postId",
  identifyUser,
  postController.unlikePostController,
);

// Private Route to get all posts from DB for loggedIn user
postRouter.get("/feed", identifyUser, postController.getFeedController);

module.exports = postRouter;
