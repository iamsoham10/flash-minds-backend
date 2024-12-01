const mongoose = require("mongoose");
const { v4: uuidV4 } = require("uuid");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    default: uuidV4,
    unique: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
