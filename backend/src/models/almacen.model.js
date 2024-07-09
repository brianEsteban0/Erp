"use strict";

const mongoose = require('mongoose');

const AlmacenSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  ubicacion: { type: String, required: true },
  fono: { type: Number, required: true }
});

module.exports = mongoose.model('Almacen', AlmacenSchema);
 