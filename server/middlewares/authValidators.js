const { check, validationResult } = require("express-validator");

const registerValidation = [
  check("username").notEmpty().isLength({ min: 3 }),
  check("email").notEmpty().isEmail(),
  check("password").notEmpty().isLength({ min: 6 }),
];

const loginValidation = [
  check("email").notEmpty().isEmail(),
  check("password").notEmpty(),
];

const validate = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  next();
};

module.exports = { registerValidation, loginValidation, validate };
