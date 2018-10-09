const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    playerOne: {
        type: String,
        required: true
    },
    playerTwo: {
        type: String,
        required: true
    },
    pOneScore: {
        type: Number,
        default: 0
    },
    pTwoScore: {
        type: Number,
        default: 0
    },
    playedAt: {
        type: Date,
        default: new Date(),
        required: true
    }
});

module.exports = mongoose.model('Game', GameSchema);