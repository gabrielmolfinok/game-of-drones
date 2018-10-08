const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema   = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'El nombre es necesario']
    },
    created: {
        type: Date,
        default: new Date(),
        required: [true, 'Error en subir la fecha']
    }
});

module.exports = mongoose.model('User', UserSchema);