const InventarioController = require("../controllers/inventario.controller");
const { handleError } = require("../utils/errorHandler");

const restarCantidad = async (req, res, next) => {
    try {
        const { inventarios} = req.body;
        const producto = await InventarioController.restarCantidad(inventarios);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        next();
    }
    catch (error) {
        handleError(error, res);
    }
}

module.exports = restarCantidad;

