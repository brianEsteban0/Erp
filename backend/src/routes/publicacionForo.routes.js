"use strict";

const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const publicacionForoController = require("../controllers/publicacionForo.controller.js");
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Rutas para obtener publicaciones del foro
router.get("/", publicacionForoController.getPublicacionesForo);
router.get("/:id", publicacionForoController.getPublicacionForoById);
router.post("/", publicacionForoController.createPublicacionForo);
// Rutas para crear, actualizar y eliminar publicaciones del foro
router.put("/:id", publicacionForoController.updatePublicacionForo);
router.delete("/:id", publicacionForoController.deletePublicacionForo);
router.put("/comentar/:id", publicacionForoController.comentar);

module.exports = router;