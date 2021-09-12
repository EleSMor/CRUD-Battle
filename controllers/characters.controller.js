const Character = require('../models/Character.model');

const charactersGet = async (req, res, next) => {
    try {
        const characters = await Character.find();
        return res.status(200).json(characters);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    charactersGet,
}