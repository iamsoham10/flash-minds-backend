const express = require("express");
const router = express.Router();
const { registerUser } = require("./../controllers/userController");
const { loginUser } = require("./../controllers/userController");
const { registerValidation, loginValidation, validate } = require("../middlewares/authValidators");

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);
router.get("/protected", (req, res) => {
  res.status(200).json({ message: `Welcome ${req.query.person}` });
});

module.exports = router;
