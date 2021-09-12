const express = require('express');

const {
    charactersGet,
} = require('../controllers/characters.controller')

const router = express.Router();

router.get('/', charactersGet);

module.exports = router;