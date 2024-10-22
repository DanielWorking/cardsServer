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

//* get card using card id
const getCard = async (cardId) => {
    try {
        let card = await Card.findById(cardId);
        return card;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//* get my cards using user id
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

//* update card using card id and the new data of the card
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

//* change bizNumber of card using card id and the new bizNumber
const changeBizNumber = async (cardId, bizNumber) => {
    try {
        let card = await Card.findById(cardId);
        if (!card) {
            throw new Error("Card not found");
        }
        card.bizNumber = bizNumber;
        await card.save();
        return card;
    } catch (error) {
        createError("Mongoose", error);
    }
};

//* like card using card id and the user id
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

//* delete card using card id
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
