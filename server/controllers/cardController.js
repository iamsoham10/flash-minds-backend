const Card = require("../models/Card");

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

const deleteCard = async(req, res) => {
  const {_id} = req.query;
  try{
    const cardToDelete = await Card.findOne({_id});
    if(!cardToDelete){
      return res.status(404).json({error: "Card not found"});
    }
    await Card.deleteOne({_id});
    res.status(201).json({message: "Card deleted successfully"});
  } catch(err){
    res.status(500).json({error: err.message});
  }
}

const getCard = async(req, res) => {
  const {user_id} = req.query;
  try{
    const readCard = await Card.find({user_id});
    if(!readCard){
      res.status(404).json({error: "No cards found"});
    }
    res.status(200).json({cards: readCard});
  } catch(err){
    res.status(500).json({error: err.message});
  }
}

module.exports = { addCard, deleteCard, getCard };
