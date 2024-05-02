"use strict";

//importa el modulo 'express' para crear las rutas
const express = require("express");

//importa el controlador de publicaciones
const proyectoController = require("../controllers/proyecto.controller");

/** Middlewares de autorización */
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

const router = express.Router();

//define rutas para las publicaciones
router.get("/", proyectoController.getProyectos);

router.get("/:id", proyectoController.getProyectoById);

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

//define rutas para crear publicaciones
router.post("/", authorizationMiddleware.isAdmin,proyectoController.createProyecto);

//define rutas para actualizar publicaciones
router.put("/:id", authorizationMiddleware.isAdmin,proyectoController.updateProyecto);

//define rutas para eliminar publicaciones
router.delete("/:id", authorizationMiddleware.isAdmin,proyectoController.deleteProyecto);

module.exports = router;