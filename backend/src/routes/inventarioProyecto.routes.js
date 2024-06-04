"use strict";

const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const inventarioProyectoController = require("../controllers/inventarioProyecto.controller.js");
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Rutas para obtener publicaciones del foro
router.get("/", inventarioProyectoController.getInventarioProyecto);
router.get("/:id", inventarioProyectoController.getInventarioProyectoById);
router.post("/", inventarioProyectoController.createInventarioProyecto);
router.put("/:id", inventarioProyectoController.updateInventarioProyecto);
router.delete("/:id", inventarioProyectoController.deleteInventarioProyecto);

module.exports = router;