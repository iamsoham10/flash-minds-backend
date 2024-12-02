const User = require("./../models/User");
const bcrypt = require("bcryptjs");
const { v4: uuidV4 } = require("uuid");

// Register a user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPass = await bcrypt.hash(password, 10);
    // create new user with a unique user_id and hased password
    const user = new User({
      username,
      email,
      password: hashedPass,
      user_id: uuidV4(),
    });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userEmailExist = await User.findOne({ email });
    if (!userEmailExist) {
      return res.status(401).json({ error: "User not found" });
    }
    const isPassValid = await bcrypt.compare(password, userEmailExist.password);
    if (!isPassValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.status(200).json({ message: "User logged in successfully" });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = { registerUser, loginUser };
