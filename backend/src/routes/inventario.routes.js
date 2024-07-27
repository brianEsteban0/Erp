"use strict";

const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const inventarioController = require("../controllers/inventario.controller.js");
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Rutas para obtener publicaciones del foro
router.get("/", inventarioController.getInventario);
router.get("/:id", inventarioController.getInventarioById);
router.post("/", inventarioController.createInventario);
router.put("/:id", inventarioController.updateInventario);
router.delete("/:id", inventarioController.deleteInventario);

module.exports = router;