"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Enrutador de publicaciones */
const proyectoRoutes = require("./proyectos.routes.js");

/** Enrutador de publicaciones */
const publicacionForoRoutes = require("./publicacionForo.routes.js");

/** Enrutador de Asignaciones**/
const assignmentRoutes = require("./assignment.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

// Define las rutas para las publicaciones
router.use("/proyectos", proyectoRoutes);

// Define las rutas para las publicaciones
router.use("/foro", publicacionForoRoutes);

//Define las rutas para las asignaciones
router.use("/asignaciones", assignmentRoutes);

// Exporta el enrutador
module.exports = router;
