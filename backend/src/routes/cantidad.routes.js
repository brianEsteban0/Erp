"use strict";

const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const cantidadController = require("../controllers/cantidad.controller.js");
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Rutas para obtener publicaciones del foro
router.get("/", cantidadController.getCantidad);
router.get("/:id", cantidadController.getCantidadById);
router.get("/material/:id", cantidadController.getCantidadByMaterial);
router.get("/almacen/:id", cantidadController.getCantidadByAlmacen);
router.post("/", cantidadController.createCantidad);
// Rutas para crear, actualizar y eliminar publicaciones del foro
router.put("/:id", cantidadController.updateCantidad);
router.put("/sumar/:id", cantidadController.sumarCantidad);
router.put("/restar/:id", cantidadController.restarCantidad);
router.delete("/:id", cantidadController.deleteCantidad);

module.exports = router;