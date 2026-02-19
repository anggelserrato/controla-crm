import Joi from 'joi';

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required().messages({
    'string.base': 'El email debe ser un texto',
    'string.empty': 'El email es obligatorio',
    'string.email': 'El email debe ser válido',
    'any.required': 'El email es obligatorio',
  }),
  password: Joi.string().required().messages({
    'string.base': 'La contraseña debe ser un texto',
    'string.empty': 'La contraseña es obligatoria',
    'any.required': 'La contraseña es obligatoria',
  }),
}).unknown(false);
