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
        ref: 'Cantidad',
        required: true
        },
        cantidadAsignada: {
            type: Number,
            required: true
        }
    }],
}, { strictPopulate: false });

const InventarioProyecto = mongoose.model('InventarioProyecto', inventarioProyectoSchema);

module.exports = InventarioProyecto;