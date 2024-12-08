const express = require("express");
const router = express.Router();
const { addCard, deleteCard, getCard } = require("../controllers/cardController");

router.post("/addcard", addCard);
router.delete("/deletecard", deleteCard);
router.get("/readcard", getCard);

module.exports = router;
