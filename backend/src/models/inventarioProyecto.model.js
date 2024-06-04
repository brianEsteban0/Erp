const mongoose = require('mongoose');

const inventarioProyectoSchema = new mongoose.Schema({
    proyecto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: true
    },
    inventarios: [{
        inventario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventario',
        required: true
        },
        cantidadEnProyecto: {
            type: Number,
            required: true,
        },
        precioTotal: {
            type: Number,
            required: true,
        },
    }],
});

const InventarioProyecto = mongoose.model('InventarioProyecto', inventarioProyectoSchema);

module.exports = InventarioProyecto;