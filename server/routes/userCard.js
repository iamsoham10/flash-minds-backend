const express = require("express");
const router = express.Router();
const { addCard } = require("./../controllers/addCard");
const { authenticate } = require("./../middlewares/authenticate");

router.post("/addcard", addCard);

module.exports = router;
