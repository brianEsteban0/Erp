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
        type: String,
    },
    comentarios: [{
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Usuario",
            required: true,
        },
        contenido: {
            type: String,
            required: true,
        },
        fecha: {
            type: Date,
        },
    }],
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    fechaCreacion: {
        type: Date,
        default: Date.now,
    },
});

const PublicacionForo = mongoose.model("PublicacionForo", publicacionForoSchema);

module.exports = PublicacionForo;