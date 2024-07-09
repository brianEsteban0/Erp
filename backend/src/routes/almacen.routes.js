"use strict";

const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const almacenController = require("../controllers/almacen.controller.js");
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Rutas para obtener publicaciones del foro
router.get("/", almacenController.getAlmacen);
router.get("/:id", almacenController.getAlmacenById);
router.post("/", almacenController.createAlmacen);
// Rutas para crear, actualizar y eliminar publicaciones del foro
router.put("/:id", almacenController.updateAlmacen);
router.delete("/:id", almacenController.deleteAlmacen);

module.exports = router;