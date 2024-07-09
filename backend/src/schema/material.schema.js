"use strict";

const Joi = require("joi");

const materialIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

/**
 * Esquema de validación para el cuerpo de la solicitud de inventario.
 * @constant {Object}
 */
const materialBodySchema = Joi.object({
    nombre: Joi.string().min(2).max(100).required().messages({
        "string.empty": "El nombre del inventario no puede estar vacío.",
        "any.required": "El nombre del inventario es obligatorio.",
        "string.base": "El nombre del inventario debe ser de tipo string.",
        "string.min": "El nombre del inventario debe tener al menos 2 caracteres.",
        "string.max": "El nombre del inventario es muy grande.",
    }),
    descripcion: Joi.string().min(2).max(400).required().messages({
        "string.empty": "El nombre del inventario no puede estar vacío.",
        "any.required": "El nombre del inventario es obligatorio.",
        "string.base": "El nombre del inventario debe ser de tipo string.",
        "string.min": "El nombre del inventario debe tener al menos 2 caracteres.",
        "string.max": "El nombre del inventario es muy grande.",
    }),
    tipo: Joi.string().min(2).max(40).required().messages({
        "string.empty": "El nombre del inventario no puede estar vacío.",
        "any.required": "El nombre del inventario es obligatorio.",
        "string.base": "El nombre del inventario debe ser de tipo string.",
        "string.min": "El nombre del inventario debe tener al menos 2 caracteres.",
        "string.max": "El nombre del inventario es muy grande.",
    }),
    unidad: Joi.string().min(2).max(40).required().messages({
        "string.empty": "El nombre del inventario no puede estar vacío.",
        "any.required": "El nombre del inventario es obligatorio.",
        "string.base": "El nombre del inventario debe ser de tipo string.",
        "string.min": "El nombre del inventario debe tener al menos 2 caracteres.",
        "string.max": "El nombre del inventario es muy grande.",
    }),

}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { materialBodySchema, materialIdSchema };