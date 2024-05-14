"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de publicación de foro.
 * @constant {Object}
 */
const publicacionForoBodySchema = Joi.object({
  titulo: Joi.string().required().messages({
    "string.empty": "El título no puede estar vacío.",
    "any.required": "El título es obligatorio.",
    "string.base": "El título debe ser de tipo string.",
  }),
  contenido: Joi.string().required().messages({
    "string.empty": "El contenido no puede estar vacío.",
    "any.required": "El contenido es obligatorio.",
    "string.base": "El contenido debe ser de tipo string.",
  }),
  imagen: Joi.string().allow("").optional().messages({
    "string.base": "La imagen debe ser de tipo string.",
  }),
  comentarios: Joi.array().items(
    Joi.object({
      usuario: Joi.string().required().messages({
        "string.empty": "El usuario del comentario no puede estar vacío.",
        "any.required": "El usuario del comentario es obligatorio.",
        "string.base": "El usuario del comentario debe ser de tipo string.",
      }),
      contenido: Joi.string().required().messages({
        "string.empty": "El contenido del comentario no puede estar vacío.",
        "any.required": "El contenido del comentario es obligatorio.",
        "string.base": "El contenido del comentario debe ser de tipo string.",
      }),
      fecha: Joi.date().optional().messages({
        "date.base": "La fecha del comentario debe ser de tipo date.",
      }),
    })
  ).optional().messages({
    "array.base": "Los comentarios deben ser de tipo array.",
  }),
  autor: Joi.string().required().messages({
    "string.empty": "El autor no puede estar vacío.",
    "any.required": "El autor es obligatorio.",
    "string.base": "El autor debe ser de tipo string.",
  }),
  fechaCreacion: Joi.date().optional().messages({
    "date.base": "La fecha de creación debe ser de tipo date.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de la publicación de foro.
 * @constant {Object}
 */
const publicacionForoIdSchema = Joi.object({
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

module.exports = { publicacionForoBodySchema, publicacionForoIdSchema };