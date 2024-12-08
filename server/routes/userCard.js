const express = require("express");
const router = express.Router();
const { addCard, deleteCard, getCard, updateCard } = require("../controllers/cardController");

router.post("/addcard", addCard);
router.delete("/deletecard", deleteCard);
router.get("/readcard", getCard);
router.put("/updatecard", updateCard);

module.exports = router;
