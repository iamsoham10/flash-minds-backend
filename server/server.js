const express = require("express");
const connectToDB = require("./config/db");
const userAuth = require("./routes/userAuth");

const app = express();
const PORT = process.env.port || 5000;
app.use(express.json());
connectToDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/users", userAuth);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT} 🎉`);
});
