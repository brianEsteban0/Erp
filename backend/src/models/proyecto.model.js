"use strict";


const mongoose = require("mongoose");

//esquema de las publicaciones, estas poseen un titulo, de que tratan, su objetivo, la fecha de inicio y fin de la postulacion y el monto, segun encuesta adicionalmente se agrega campo de maximo de cupos para la postulacion
const proyectosSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    objetivo: {
        type: String,
        required: true,
    },
    fecha_inicio: {
        type: Date,
        required: true,
    },
    fecha_termino: {
        type: Date,
        required: true,
    },
});

const Proyecto  = mongoose.model("Proyecto", proyectosSchema);

module.exports = Proyecto;