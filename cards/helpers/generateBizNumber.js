const _ = require("lodash");
const Card = require("../models/mongodb/Card");
const { createError } = require("../../utils/handleErrors");

const generateBizNumber = async () => {
    let cardsCount = await Card.find().countDocuments();
    if (cardsCount === 9_000_000) {
        createError("Business Number", "Maximum cards count reached");
    }
    let random;
    do {
        random = _.random(1_000_000, 9_999_999);
    } while (await isBizNumberExists(random));
    return random;
};

const isBizNumberExists = async (bizNumber) => {
    try {
        const cardWithThisBizNumber = await Card.findOne({ bizNumber });
        return Boolean(cardWithThisBizNumber);
    } catch (error) {
        createError("Mongoose", error);
    }
};

module.exports = { generateBizNumber };
