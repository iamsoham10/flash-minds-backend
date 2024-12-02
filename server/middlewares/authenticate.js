const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodeToken;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
