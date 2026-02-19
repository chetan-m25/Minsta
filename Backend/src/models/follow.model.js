const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    // Username of the person who sends follow request
    follower: {
      type: String,
    },

    // Username of the person being followed
    following: {
      type: String,
    },

    // Status of follow request
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },

  { timestamps: true }, // Adds createdAt and updatedAt
);

// Prevent duplicate follow requests between same users
followSchema.index({ follower: 1, following: 1 }, { unique: true });

const followModel = mongoose.model("follows", followSchema);

module.exports = followModel;
