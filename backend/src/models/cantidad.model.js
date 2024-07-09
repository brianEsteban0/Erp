"use strict";

const mongoose = require('mongoose');

const CantidadSchema = new mongoose.Schema({
    material: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
        required: true,
     },
    cantidad: { type: Number, required: true },
    almacen: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Almacen",
        required: true,
   },
    fechaIngreso: { type: Date, required: true },
    usuarioIngreso: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
});

module.exports = mongoose.model('Cantidad', CantidadSchema);
