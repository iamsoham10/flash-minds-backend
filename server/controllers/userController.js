const User = require("./../models/User");
const { v4: uuidV4 } = require("uuid");

// Register a user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    // create new user with a unique user_id
    const user = await User.create({
      username,
      email,
      password,
      user_id: uuidV4(),
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser };
