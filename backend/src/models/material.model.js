"use strict";

const mongoose = require('mongoose');

const MaterialSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    tipo: { type: String, required: true },
    unidad: { type: String, required: true },
});

module.exports = mongoose.model('Material', MaterialSchema);
