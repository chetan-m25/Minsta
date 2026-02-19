const express = require("express");
const followRouter = express.Router();
const followController = require("../controllers/follow.controller");
const identifyUser = require("../middlewares/auth.middleware");

// Send follow request to a user (creates pending relationship)
followRouter.post(
  "/:username",
  identifyUser,
  followController.followController,
);

// Accept a pending follow request
followRouter.post(
  "/accept/:username",
  identifyUser,
  followController.acceptFollowController,
);

// Reject a pending follow request
followRouter.post(
  "/reject/:username",
  identifyUser,
  followController.rejectFollowController,
);

// Unfollow an already accepted relationship
followRouter.post(
  "/unfollow/:username",
  identifyUser,
  followController.unfollowController,
);

module.exports = followRouter;
