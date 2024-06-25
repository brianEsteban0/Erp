"use strict";

const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const imagenController = require("../controllers/imagen.controller.js");
const upload = require("../middlewares/handleFile.middleware.js");
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Rutas para crear, actualizar y eliminar publicaciones del foro
router.post("/:user/:publicacionNombre", upload.single("archivos"), imagenController.createImagen);
router.get("/:id", imagenController.getImagen);


module.exports = router;