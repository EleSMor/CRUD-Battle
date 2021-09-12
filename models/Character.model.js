const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const characterSchema = new Schema({
    name: { type: String, required: true },
    level: { type: Number, required: true, min: 1, default: 1 },
    experience: { type: Number, default: 0 },
    fightOptions: [{ type: String, enum: ['Ataque Básico', 'Ataque Especial', 'Defensa'], required: true, default: 'Atacar' }],
    stats: {
        healthPoints: { type: Number, default: 10 },
        attack: { type: Number, default: 1 },
        defense: { type: Number, default: 1 },
        criticalRate: { type: Number, default: 0.2},
        criticalDamage: { type: Number, default: 1.5},
    },
    image: { type: String },
    imageSprite: [{ type: String, required: true }]
}, {

    timestamps: true,
});

const Character = mongoose.model('characters', characterSchema);
module.exports = Character;