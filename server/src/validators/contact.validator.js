import Joi from 'joi';

export const contactSchema = Joi.object({
  firstName: Joi.string().trim().required().messages({
    'string.empty': 'El nombre es obligatorio.',
    'any.required': 'El nombre es obligatorio.',
  }),
  lastName: Joi.string().trim().required().messages({
    'string.empty': 'El apellido es obligatorio.',
    'any.required': 'El apellido es obligatorio.',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'El email debe ser válido.',
      'string.empty': 'El email es obligatorio.',
      'any.required': 'El email es obligatorio.',
    }),
  phone: Joi.string().allow('').messages({
    'string.base': 'El teléfono debe ser un texto.',
  }),
  status: Joi.string()
    .valid('NEW', 'IN_PROGRESS', 'CONTACTED', 'CLOSED')
    .default('NEW')
    .messages({
      'any.only':
        'El estado debe ser uno de: NEW, IN_PROGRESS, CONTACTED, CLOSED.',
    }),
  notes: Joi.string().allow('').messages({
    'string.base': 'Las notas deben ser un texto.',
  }),
}).unknown(false);

export const statusSchema = Joi.object({
  status: Joi.string()
    .valid('NEW', 'IN_PROGRESS', 'CONTACTED', 'CLOSED')
    .required()
    .messages({
      'any.only':
        'El estado debe ser uno de: NEW, IN_PROGRESS, CONTACTED, CLOSED.',
      'any.required': 'El estado es obligatorio.',
      'string.empty': 'El estado es obligatorio.',
    }),
}).unknown(false);
