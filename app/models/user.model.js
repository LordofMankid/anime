const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    planned: [],
    watching: [],
    completed: [],
    about: String,
    profile_pic: Number,
  })
);

module.exports = User;
