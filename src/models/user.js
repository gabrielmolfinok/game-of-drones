const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema   = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario']
    },
    played: {
        type: Number,
        default: 0
    },
    wins: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: new Date(),
        required: [true, 'Error en subir la fecha']
    }
});

module.exports = mongoose.model('User', UserSchema);