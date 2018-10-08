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
    playerMoves: {
        type: Object
    }
});

module.exports = mongoose.model('Game', GameSchema);