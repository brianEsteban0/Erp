const JOI = require('joi');

const assignmentBodySchema = JOI.object({

    Proyecto: JOI.string()
    .required()
    .messages({
        'string.empty': 'El proyecto no puede estar vacío.',
        'any.required': 'El proyecto es obligatorio.',
        'string.base': 'El proyecto debe ser de tipo string.',
    }),

    Participantes: JOI.array()
    .required()
    .messages({
        'string.empty': 'Los participantes no pueden estar vacíos.',
        'any.required': 'Los participantes son obligatorio.',
        'string.base': 'Los participantes deben ser de tipo string.',
    }),

    description: JOI.string()
        .required()
        .min(1)
        .max(255)
        .messages({
            "string.empty": "La descripción no puede quedar vacía",
            "any.required": "La descripción es requerida",
            "string.min": "La descripción debe tener al menos 1 carácter",
            "string.max": "La descripción no puede tener más de 255 carácteres",
      }),

    createdAt: JOI.date()
        .optional()
        .messages({
            "date.base": "La fecha de creación debe ser una fecha válida",
            "string.empty": "La fecha de creación no puede quedar vacía",
        }),

    updatedAt: JOI.date()
    .optional()
    .messages({
        "date.base": "La fecha de actualización debe ser una fecha válida",
        "string.empty": "La fecha de actualización no puede quedar vacía",
    }),
    
});

const assignmentIdSchema = JOI.object({
    id: JOI.string()
      .required()
      .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
      .messages({
        "string.empty": "El id no puede estar vacío.",
        "any.required": "El id es obligatorio.",
        "string.base": "El id debe ser de tipo string.",
        "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
      }),
  });

module.exports = { assignmentBodySchema, assignmentIdSchema };