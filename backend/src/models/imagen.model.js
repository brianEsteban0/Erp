const mongoose = require('mongoose');

const imagenSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    publicacion: {
        type: String,
        required: true
    }
});

const Imagen = mongoose.model('Imagen', imagenSchema);

module.exports = Imagen;