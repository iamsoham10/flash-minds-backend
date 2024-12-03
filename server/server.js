const express = require("express");
const connectToDB = require("./config/db");
const cors = require("cors");
const userAuth = require("./routes/userAuth");
const authenticate = require("./middlewares/authenticate");

const app = express();
app.use(cors());
const PORT = process.env.port || 5000;
app.use(express.json());
connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", userAuth);

// middleware to authenticate requests
app.use("/api/auth", authenticate, userAuth);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT} 🎉`);
});
