"use strict";

const express = require("express");
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");
const materialController = require("../controllers/material.controller.js");
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
router.use(authenticationMiddleware);

// Rutas para obtener publicaciones del foro
router.get("/", materialController.getMaterial);
router.get("/:id", materialController.getMaterialById);
router.post("/", materialController.createMaterial);
// Rutas para crear, actualizar y eliminar publicaciones del foro
router.put("/:id", materialController.updateMaterial);
router.delete("/:id", materialController.deleteMaterial);

module.exports = router;