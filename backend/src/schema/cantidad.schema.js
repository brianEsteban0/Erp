"use strict";

const Joi = require("joi");

const cantidadIdSchema = Joi.object({
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
const cantidadBodySchema = Joi.object({
    material: Joi.string().required().messages({
        "string.empty": "El nombre del inventario no puede estar vacío.",
        "any.required": "El nombre del inventario es obligatorio.",
        "string.base": "El nombre del inventario debe ser de tipo string.",
    }),
    cantidad: Joi.number().integer().min(1).max(99999).required().messages({
        "number.empty": "La cantidad no puede estar vacía.",
        "any.required": "La cantidad es obligatoria.",
        "number.base": "La cantidad debe ser de tipo numérico.",
        "number.integer": "La cantidad debe ser un número entero.",
        "number.min": "La cantidad debe ser mayor o igual a cero.",
        "number.max": "La cantidad debe se menor.",
    }),
    almacen: Joi.string().required().messages({
        "string.empty": "El nombre del inventario no puede estar vacío.",
        "any.required": "El nombre del inventario es obligatorio.",
        "string.base": "El nombre del inventario debe ser de tipo string.",
    }),
    fechaIngreso: Joi.date().optional().messages({
        "date.base": "La fecha de ingreso debe ser de tipo date.",
    }),
    usuarioIngreso: Joi.string().required().messages({
        "string.empty": "El nombre del inventario no puede estar vacío.",
        "any.required": "El nombre del inventario es obligatorio.",
        "string.base": "El nombre del inventario debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { cantidadBodySchema, cantidadIdSchema };