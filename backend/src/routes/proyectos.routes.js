"use strict";

const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyecto.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

// Middleware de autorización y autenticación para todas las rutas
//router.use(authenticationMiddleware);
//router.use(authorizationMiddleware);

// Rutas para obtener proyectos
router.get("/", proyectoController.getProyectos);
router.get("/:id", proyectoController.getProyectoById);

// Rutas para crear, actualizar y eliminar proyectos
router.post("/", proyectoController.createProyecto);
router.put("/:id", proyectoController.updateProyecto);
router.delete("/:id", proyectoController.deleteProyecto);

// Ruta para actualizar el estado de una actividad
router.patch("/:proyectoId/actividades/:actividadIndex", proyectoController.updateActividadEstado);

module.exports = router;
