const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

// Route for user registration
authRouter.post("/register", authController.registerController);

// Route for user login
authRouter.post("/login", authController.loginController);

// Route to get current loggedIn user details
authRouter.get("/get-me", identifyUser, authController.getMeController);

// Route for user logout
authRouter.post("/logout", identifyUser, authController.logoutController);

module.exports = authRouter;
