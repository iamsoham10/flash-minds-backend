const express = require("express");
const router = express.Router();
const { addCard, deleteCard } = require("../controllers/cardController");

router.post("/addcard", addCard);
router.delete("/deletecard", deleteCard);

module.exports = router;
