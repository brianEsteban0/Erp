const { restarCantidad } = require("../services/cantidad.service");
const { handleError } = require("../utils/errorHandler");

const restarCantidadMiddleware = async (req, res, next) => {
    try {
        const { inventarios } = req.body;

        // Validar que la cantidad no sea cero
        inventarios.forEach((inventario) => {
            if (inventario.cantidad === 0) {
                console.log("Producto no encontrado");
            }
        });

        // Intentar restar la cantidad de cada inventario
        for (let inventario of inventarios) {
            console.log(inventario);
            const producto = await restarCantidad(inventario);

            // Si el producto no se encuentra, lanzar un error
            if (!producto) {
                console.log("Producto no encontrado");
            }
        }

        next();
    } catch (error) {
        // Enviar el error al middleware de manejo de errores
        handleError(error, res);
    }
};

module.exports = restarCantidadMiddleware;


