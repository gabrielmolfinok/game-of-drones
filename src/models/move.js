const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoveSchema   = new Schema({
    name: {
        type: String,
        required: [true, 'Name is necessary']
    },
    kills: {
        type: String,
        required: [true, 'Who kills this move?']
    }
});

module.exports = mongoose.model('Move', MoveSchema);