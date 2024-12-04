const Card = require("./../models/Card");

const addCard = async (req, res) => {
  const { term, definition } = req.body;
  const user_id = req.user.user_id;
  try {
    const card = new Card({
      term,
      definition,
      user_id,
    });
    await Card.create(card);
    res.status(201).json({ message: "Card added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addCard };
