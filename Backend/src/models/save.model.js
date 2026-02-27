const mongoose = require("mongoose");

// Schema for saved posts "edge" collection
const saveSchema = new mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: [true, "Post id is required to save a post"],
    },
    user: {
      type: String,
      required: [true, "User name is required to save a post"],
    },
  },
  { timestamps: true },
);

// Prevent duplicate saves (same user cannot save same post twice)
saveSchema.index({ post: 1, user: 1 }, { unique: true });

const saveModel = mongoose.model("saves", saveSchema);

module.exports = saveModel;

