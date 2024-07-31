"use strict";

const Joi = require("joi");


const inventarioProyectoIdSchema = Joi.object({
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

const inventarioSchema = Joi.object({
  inventario: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id del inventario no puede estar vacío.",
      "any.required": "El id del inventario es obligatorio.",
      "string.base": "El id del inventario debe ser de tipo string.",
      "string.pattern.base": "El id del inventario proporcionado no es un ObjectId válido.",
    }),
  cantidadAsignada: Joi.number().min(0).max(99999).required().messages({
    "number.base": "La cantidad en proyecto debe ser un número.",
    "any.required": "La cantidad en proyecto es obligatoria.",
    "number.min": "La cantidad en proyecto debe ser mayor o igual a cero.",
    "number.max": "La cantidad en proyecto es muy grande.",
  })
});

const inventarioProyectoBodySchema = Joi.object({
  proyecto: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id del proyecto no puede estar vacío.",
      "any.required": "El id del proyecto es obligatorio.",
      "string.base": "El id del proyecto debe ser de tipo string.",
      "string.pattern.base": "El id del proyecto proporcionado no es un ObjectId válido.",
    }),
  inventarios: Joi.array().items(inventarioSchema).required().messages({
    "array.base": "El inventarios debe ser de tipo array.",
    "any.required": "El inventarios es obligatorio.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = { inventarioProyectoBodySchema, inventarioProyectoIdSchema };