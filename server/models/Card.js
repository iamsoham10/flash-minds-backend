const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  term: {
    type: String,
    required: true,
    user_id: String,
  },
  definition: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
