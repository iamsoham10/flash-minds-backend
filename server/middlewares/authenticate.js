const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }
  const tokenWithoutBearer = token.split(" ")[1];
  try {
    const decodedToken = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
