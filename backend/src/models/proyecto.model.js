"use strict";


const mongoose = require("mongoose");

//esquema de las publicaciones, estas poseen un titulo, de que tratan, el nombre de la empresa licitante, la fecha de inicio y fin del proyecto
const proyectosSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    empresa_licitante: {
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