const Card = require("../models/Card");

const addCard = async (req, res) => {
  const { cards } = req.body;
  const user_id = req.user.user_id;
  const username = req.user.username;
  try {
    const cardPromises = cards.map((card) => {
      const newCard = new Card({
        term: card.term,
        definition: card.definition,
        user_id,
        username,
      });
      return Card.create(newCard);
    });
    await Promise.all(cardPromises);
    res.status(201).json({ message: "Cards added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteCard = async (req, res) => {
  const { _id } = req.query;
  try {
    const cardToDelete = await Card.findOne({ _id });
    if (!cardToDelete) {
      return res.status(404).json({ error: "Card not found" });
    }
    await Card.deleteOne({ _id });
    res.status(201).json({ message: "Card deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCard = async (req, res) => {
  const { user_id } = req.query;
  try {
    const readCard = await Card.find({ user_id });
    if (!readCard) {
      res.status(404).json({ error: "No cards found" });
    }
    res.status(200).json({ cards: readCard });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCard = async (req, res) => {
  const { _id } = req.query;
  const { term, definition } = req.body;
  try {
    const cardToUpdate = await Card.findByIdAndUpdate(_id, {
      term: term,
      definition: definition,
    });
    if (!cardToUpdate) {
      res.status(404).json({ error: "Card not found" });
    }
    res.status(201).json({ message: "Card updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addCard, deleteCard, getCard, updateCard };
