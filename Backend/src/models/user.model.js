const mongoose = require("mongoose");

// Create schema (structure) for users collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "User name already exists"],
    required: [true, "User name is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select: false, // Don't return password field by default when querying user data from DB
  },

  bio: String,

  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/chetanm26/user.png",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
