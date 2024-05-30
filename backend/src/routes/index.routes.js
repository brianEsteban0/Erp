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

/** Enrutador de imagen*/ 
const imagenRoutes = require("./imagen.routes.js");

/** Enrutador de Asignaciones**/
const assignmentRoutes = require("./assignment.routes.js");

/** Enrutador de Asistencias */
const attendanceRoutes = require("./attendance.routes.js");

/** Enrutador de Huellas Dactilares */
const fingerprintRoutes = require("./fingerprint.routes.js");

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

// Define las rutas para las imagenes
router.use("/imagen", imagenRoutes);

// Define las rutas para las asignaciones
router.use("/asignaciones", assignmentRoutes);

// Define las rutas para las asistencias
router.use("/asistencia", attendanceRoutes);

// Define las rutas para las huellas dactilares
router.use("/fingerprint", fingerprintRoutes);

// Exporta el enrutador
module.exports = router;
