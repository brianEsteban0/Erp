const mongoose = require("mongoose");

const publicacionForoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    contenido: {
        type: String,
        required: true,
    },
    imagen: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Imagen",
        default: null,
    },
    comentarios: [{
        usuario: {
            type: String,
            required: true,
        },
        contenido: {
            type: String,
            required: true,
        },
        fecha: {
            type: Date,
            default: Date.now,
        },
    }],
    autor: {
        type: String,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
});

const PublicacionForo = mongoose.model("PublicacionForo", publicacionForoSchema);

module.exports = PublicacionForo;