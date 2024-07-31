"use strict";

const Joi = require("joi");

const almacenIdSchema = Joi.object({
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
const almacenBodySchema = Joi.object({
    nombre: Joi.string().min(2).max(40).required().pattern(/^(?!\d+$)[\s\S]*$/).messages({
        "string.empty": "El nombre del inventario no puede estar vacío.",
        "any.required": "El nombre del inventario es obligatorio.",
        "string.base": "El nombre del inventario debe ser de tipo string.",
        "string.min": "El nombre del inventario debe tener al menos 2 caracteres.",
        "string.max": "El nombre del inventario es muy grande.",
        "string.pattern.base": "El nombre del inventario no puede ser solo números.",
    }),
    ubicacion: Joi.string().allow("").min(3).max(2000).pattern(/^(?!\d+$)[\s\S]*$/).required().messages({
        "string.base": "La ubicacion debe ser de tipo string.",
        "string.empty": "La ubicacion no puede estar vacía.",
        "any.required": "La ubicacion es obligatoria.",
        "string.min": "La  ubicacion tener mas de 3 caracteres.",
        "string.max": "La ubicacion es muy grande.",
        "string.pattern.base": "La ubicacion no puede ser solo números.",
    }),
    fono: Joi.number().positive().min(0).max(999999999).integer().required().messages({
        "number.empty": "El numero no puede estar vacío.",
        "any.required": "El numero es obligatorio.",
        "number.base": "El numero debe ser de tipo numérico.",
        "number.positive": "El numero debe ser un número positivo.",
        "number.min": "El numero debe ser mayor o igual a cero.",
        "number.max": "El numero es muy grande.",
        "number.integer": "El numero debe ser un número entero.",
    }),

}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { almacenBodySchema, almacenIdSchema };