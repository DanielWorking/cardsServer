const express = require("express");
const {
    createCard,
    getCards,
    getCard,
    getMyCards,
    updateCard,
    changeBizNumber,
    deleteCard,
    likeCard,
} = require("../models/cardsAccessDataService");
const auth = require("../../auth/authService");
const validateCard = require("../validation/cardValidationService");
const { normalizeCard } = require("../helpers/normalizeCard");
const { handleError } = require("../../utils/handleErrors");
const router = express.Router();

//* adapter configuration for the DB:
const config = require("config");
const DB = config.get("DB");

router.get("/", async (request, response) => {
    if (DB == "mongodb") {
        try {
            let cards = await getCards();
            response.send(cards);
        } catch (error) {
            handleError(response, 400, "Failed to retrieve cards.");
        }
    }
});

//* the order of the functions is important, the server reads from top to buttom and check what url and CRUD command the request is. to make sure the server wont think /my-cards is the id, we need to position the my-cards function before the /:cardId functions

//* get my cards
router.get("/my-cards", auth, async (request, response) => {
    if (DB == "mongodb") {
        try {
            const userInfo = request.user;
            if (!userInfo.isBusiness) {
                return handleError(
                    response,
                    403,
                    "User is not authorized to view business cards."
                );
            }
            let myCards = await getMyCards(userInfo._id);
            response.send(myCards);
        } catch (error) {
            handleError(response, 500, error.message);
        }
    }
});

//* get card
router.get("/:cardId", async (request, response) => {
    if (DB == "mongodb") {
        try {
            let card = await getCard(request.params.cardId);
            response.send(card);
        } catch (error) {
            handleError(response, 500, error.message);
        }
    }
});

//* create cards
router.post("/", auth, async (request, response) => {
    if (DB == "mongodb") {
        try {
            const userInfo = request.user;
            if (!userInfo.isBusiness) {
                return handleError(
                    response,
                    403,
                    "Only business user can create new card"
                );
            }

            const errorMessage = validateCard(request.body);
            if (errorMessage !== "") {
                return handleError(
                    response,
                    400,
                    "Validation error: " + errorMessage
                );
            }

            let card = await normalizeCard(request.body, userInfo._id);
            card = await createCard(card);
            response.status(201).send(card);
        } catch (error) {
            handleError(response, error.status || 400, error.message);
        }
    }
});

//* update card
router.put("/:cardId", auth, async (request, response) => {
    if (DB == "mongodb") {
        try {
            const userInfo = request.user;
            const newCard = request.body;
            const { cardId } = request.params;
            const fullCardFromDb = await getCard(cardId);
            if (userInfo._id !== fullCardFromDb.user_id && !userInfo.isAdmin) {
                return handleError(
                    response,
                    403,
                    "Authorization Error: Only the user who created the business card or admin can update its details"
                );
            }

            const errorMessage = validateCard(newCard);
            if (errorMessage !== "") {
                return handleError(
                    response,
                    400,
                    "Validation error: " + errorMessage
                );
            }

            let card = await normalizeCard(newCard, userInfo._id);
            card = await updateCard(cardId, card);
            response.send(card);
        } catch (error) {
            handleError(response, error.status || 400, error.message);
        }
    }
});

//* change the biznumber
router.patch("/:cardId", auth, async (request, response) => {
    if (DB == "mongodb") {
        try {
            let card = await changeBizNumber(
                request.params.cardId,
                request.body
            );
            response.send(card);
        } catch (error) {
            handleError(response, 404, "Card not found.");
        }
    }
});

//* like card
router.patch("/:cardId", auth, async (request, response) => {
    if (DB == "mongodb") {
        try {
            const { cardId } = request.params;
            const userId = request.user._id;
            let card = await likeCard(cardId, userId);
            response.send(card);
        } catch (error) {
            handleError(response, 404, "Card not found.");
        }
    }
});

//* get card
router.delete("/:cardId", auth, async (request, response) => {
    if (DB == "mongodb") {
        try {
            const { cardId } = request.params;
            const userInfo = request.user;
            const fullCardFromDb = await getCard(cardId);
            if (userInfo._id !== fullCardFromDb.user_id && !userInfo.isAdmin) {
                return handleError(
                    response,
                    403,
                    "User is not authorized to delete this card."
                );
            }
            let deletingCard = await deleteCard(cardId);
            response.send(deletingCard);
        } catch (error) {
            handleError(response, 404, "Failed to delete the card.");
        }
    }
});

module.exports = router;
