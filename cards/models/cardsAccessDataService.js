const { createError } = require("../../utils/handleErrors");
const Card = require("./mongodb/Card");

const getCards = async () => {
    try {
        let cards = await Card.find();
        return cards;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//TODO: getCard(cardId) function:
const getCard = async (cardId) => {
    try {
        let card = await Card.findById(cardId);
        return card;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//TODO: getMyCards(userId) function:
//? find({userId}) - find for filtering using the condition inside. inside of object to declare the userId is a value not a key of the card entity
const getMyCards = async (userId) => {
    try {
        let myCards = Card.find({ user_id: userId });
        return myCards;
    } catch (error) {
        createError("Mongoose", error);
    }
};

const createCard = async (newCard) => {
    try {
        let card = new Card(newCard);
        card = await card.save();
        return card;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//TODO: updateCard(cardId, updatedCard) function:
//? new:true - so card will be after the update
const updateCard = async (cardId, updatedCard) => {
    try {
        let card = await Card.findByIdAndUpdate(cardId, updatedCard, {
            new: true,
        });
        card = await card.save();
        return card;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//TODO: changeBizNumber(userId, newBizNumber) function:
//? card.bizNumber = newBizNumber - only one property to change, no need for Object.assign
const changeBizNumber = async (cardId, newBizNumber) => {
    try {
        let card = await Card.findById(cardId);
        card.bizNumber = newBizNumber;
        await card.save();
        return card;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//TODO: likeCard(cardId, userId) function:
const likeCard = async (cardId, userId) => {
    try {
        let card = await Card.findById(cardId);
        if (card) {
            if (card.likes.includes(userId)) {
                let newLikesArray = card.likes.filter((id) => id != userId);
                card.likes = newLikesArray;
            } else {
                card.likes.push(userId);
            }
            await card.save();
            return card;
        }
        createError("Card", "Card not found");
    } catch (error) {
        createError("Mongoose", error);
    }
};

//TODO: deleteCard(cardId) function:
const deleteCard = async (cardId) => {
    try {
        let deletedCard = await Card.findByIdAndDelete(cardId);
        return deletedCard;
    } catch (error) {
        createError("Mongoose", error);
    }
};

module.exports = {
    getCards,
    getCard,
    getMyCards,
    createCard,
    updateCard,
    changeBizNumber,
    likeCard,
    deleteCard,
};
