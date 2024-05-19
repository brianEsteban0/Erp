const JOI = require('joi');

const assignmentBodySchema = JOI.object({

    Proyecto: JOI.string().required().messages({
        'string.empty': 'El proyecto no puede estar vacío.',
        'any.required': 'El proyecto es obligatorio.',
        'string.base': 'El proyecto debe ser de tipo string.',
    }),

    Participantes: JOI.string().required().messages({
        'string.empty': 'El nombre no puede estar vacío.',
        'any.required': 'El nombre es obligatorio.',
        'string.base': 'El nombre debe ser de tipo string.',
    }),
    
});

const assignmentIdSchema = Joi.object({
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

module.exports = { assignmentBodySchema, assignmentIdSchema };