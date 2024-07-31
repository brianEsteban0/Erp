"use strict";

const Joi = require("joi");

const objectIdPattern = /^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/;

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
    material: Joi.string().required().pattern(objectIdPattern).messages({
        "string.empty": "El material no puede estar vacío.",
        "any.required": "El material es obligatorio.",
        "string.base": "Debe ser de tipo string.",
        "string.pattern.base": "El id del material proporcionado no es un ObjectId válido.",
    }),
    cantidad: Joi.number().integer().min(1).max(99999).required().messages({
        "number.empty": "La cantidad no puede estar vacía.",
        "any.required": "La cantidad es obligatoria.",
        "number.base": "La cantidad debe ser de tipo numérico.",
        "number.integer": "La cantidad debe ser un número entero.",
        "number.min": "La cantidad debe ser mayor o igual a cero.",
        "number.max": "La cantidad debe se menor.",
    }),
    almacen: Joi.string().required().pattern(objectIdPattern).messages({
        "string.empty": "El almacen no puede estar vacío.",
        "any.required": "El almacen es obligatorio.",
        "string.base": "El almacen debe ser de tipo string.",
        "string.pattern.base": "El almacen proporcionado no es válido.",
    }),
    fechaIngreso: Joi.date().optional().messages({
        "date.base": "La fecha de ingreso debe ser de tipo date.",
    }),
    usuarioIngreso: Joi.string().required().min(2).max(200).messages({
        "string.empty": "El nombre del inventario no puede estar vacío.",
        "any.required": "El nombre del inventario es obligatorio.",
        "string.base": "El nombre del inventario debe ser de tipo string.",
        "string.min": "El nombre del inventario debe tener al menos 2 caracteres.",
        "string.max": "El nombre del inventario es muy grande.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { cantidadBodySchema, cantidadIdSchema };