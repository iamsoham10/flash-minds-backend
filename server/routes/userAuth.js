const express = require("express");
const router = express.Router();
const { registerUser } = require("./../controllers/userController");
const { loginUser } = require("./../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/protected", (req, res) => {
  res.status(200).json({ message: `Welcome ${req.user.username}` });
});

module.exports = router;
