"use strict";

const Joi = require("joi");

const inventarioIdSchema = Joi.object({
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
const inventarioBodySchema = Joi.object({
    nombre: Joi.string().min(2).max(40).required().messages({
        "string.empty": "El nombre del inventario no puede estar vacío.",
        "any.required": "El nombre del inventario es obligatorio.",
        "string.base": "El nombre del inventario debe ser de tipo string.",
        "string.min": "El nombre del inventario debe tener al menos 2 caracteres.",
        "string.max": "El nombre del inventario es muy grande.",
    }),
    cantidad: Joi.number().integer().min(0).max(99999).required().messages({
        "number.empty": "La cantidad no puede estar vacía.",
        "any.required": "La cantidad es obligatoria.",
        "number.base": "La cantidad debe ser de tipo numérico.",
        "number.integer": "La cantidad debe ser un número entero.",
        "number.min": "La cantidad debe ser mayor o igual a cero.",
        "number.max": "La cantidad debe se menor.",
    }),
    precio: Joi.number().positive().min(0).max(999999999).required().messages({
        "number.empty": "El precio no puede estar vacío.",
        "any.required": "El precio es obligatorio.",
        "number.base": "El precio debe ser de tipo numérico.",
        "number.positive": "El precio debe ser un número positivo.",
        "number.min": "El precio debe ser mayor o igual a cero.",
        "number.max": "El precio es muy grande.",
    }),
    descripcion: Joi.string().allow("").min(3).max(2000).optional().messages({
        "string.base": "La descripción debe ser de tipo string.",
        "string.min": "La descripción debe tener mas de 3 caracteres.",
        "string.max": "La descripción es muy grande.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { inventarioBodySchema, inventarioIdSchema };