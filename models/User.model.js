const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: { type: String, required: true},
        password: {type: String, required: true},
        email: { type: String, required: true},
        alias: { type: String, required: true},
        role: { type: String, enum: ['user','admin'], default: 'user'},
        characters: {type: Array, default: []}
    },
    { timestamp: true }
);

const User = mongoose.model('users', userSchema);

module.exports = User;