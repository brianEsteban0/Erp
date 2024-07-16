"use strict";


const mongoose = require("mongoose");

//esquema de las publicaciones, estas poseen un titulo, de que tratan, el nombre de la empresa licitante, la fecha de inicio y fin del proyecto
const actividadSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    descripcion: {
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
    responsable: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        required: true,
    },
});

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
    presupuesto: {
        type: Number,
        required: true,
    },
    actividades: [actividadSchema],
});

const Proyecto  = mongoose.model("Proyecto", proyectosSchema);

module.exports = Proyecto;