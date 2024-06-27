"use strict";

const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String }
});

module.exports = mongoose.model('Inventario', InventorySchema);
