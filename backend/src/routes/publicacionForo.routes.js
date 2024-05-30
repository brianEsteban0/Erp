"use strict";

const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const publicacionForoController = require("../controllers/publicacionForo.controller.js");
const upload = require("../middlewares/handleFile.middleware.js");
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Rutas para obtener publicaciones del foro
router.get("/", publicacionForoController.getPublicacionesForo);
router.get("/:id", publicacionForoController.getPublicacionForoById);

// Rutas para crear, actualizar y eliminar publicaciones del foro
router.post("/:user/:publicacionNombre",upload.single("archivos"),publicacionForoController.createPublicacionForo);
router.put("/:id", publicacionForoController.updatePublicacionForo);
router.delete("/:id", publicacionForoController.deletePublicacionForo);

module.exports = router;