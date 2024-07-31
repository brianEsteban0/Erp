"use strict";

const Joi = require("joi");

const materialId = Joi.object({
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
    nombre: Joi.string().min(2).max(100).required().pattern(/^(?!\d+$)[\s\S]*$/).messages({
        "string.empty": "El nombre del material no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "Debe ser de tipo string.",
        "string.min": "Debe tener al menos 2 caracteres.",
        "string.max": "El nombre es muy grande.",
        "string.pattern.base": "El nombre no puede ser solo números.",
    }),
    descripcion: Joi.string().min(2).max(400).required().pattern(/^(?!\d+$)[\s\S]*$/).messages({
        "string.empty": "La descripcion no puede estar vacío.",
        "any.required": "La descripcion es obligatorio.",
        "string.base": "La descripcion debe ser de tipo string.",
        "string.min": "La descripcion debe tener al menos 2 caracteres.",
        "string.max": "La descripcion es muy grande.",
        "string.pattern.base": "La descripcion no puede ser solo números.",
    }),
    tipo: Joi.string().min(2).max(200).required().messages({
        "string.empty": "El tipo no puede estar vacío.",
        "any.required": "El tipo  es obligatorio.",
        "string.base": "El tipo  debe ser de tipo string.",
        "string.min": "El tipo  debe tener al menos 2 caracteres.",
        "string.max": "El tipo  es muy grande.",
    }),
    unidad: Joi.string().min(1).max(200).required().messages({
        "string.empty": "La Unidad no puede estar vacío.",
        "any.required": "La Unidad del inventario es obligatorio.",
        "string.base": "La Unidad del inventario debe ser de tipo string.",
        "string.min": "La Unidad debe tener al menos 1 caracteres.",
        "string.max": "La Unidad ingresada es muy grande.",
    }),

}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { materialBodySchema, materialId };