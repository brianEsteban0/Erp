"use strict";

const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const inventarioProyectoController = require("../controllers/inventarioProyecto.controller.js");
const restarCantidadMiddlewere = require("../middlewares/restarCantidad.middleware.js");
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Rutas para obtener publicaciones del foro
router.get("/", inventarioProyectoController.getInventarioProyecto);
router.get("/:id", inventarioProyectoController.getInventarioProyectoById);
router.post("/", restarCantidadMiddlewere, inventarioProyectoController.createInventarioProyecto);
router.put("/:id", restarCantidadMiddlewere, inventarioProyectoController.updateInventarioProyecto);
router.delete("/:id", inventarioProyectoController.deleteInventarioProyecto);
router.get("/proyecto/:id", inventarioProyectoController.getInventarioProyectoByProyecto);
router.put("/add/:id", inventarioProyectoController.addCantidadToInventarioProyecto);
router.put("/delete/:id", inventarioProyectoController.deleteIndexInventarioProyecto);

module.exports = router;