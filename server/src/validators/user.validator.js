import Joi from 'joi';

export const userSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required().messages({
    'string.base': 'El email debe ser un texto',
    'string.empty': 'El email es obligatorio',
    'string.email': 'El email debe ser válido',
    'any.required': 'El email es obligatorio',
  }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d)/)
    .required()
    .messages({
      'string.base': 'La contraseña debe ser un texto',
      'string.empty': 'La contraseña es obligatoria',
      'string.min': 'La contraseña debe tener al menos 8 caracteres',
      'string.pattern.base':
        'La contraseña debe tener 8+ caracteres, 1 mayúscula, 1 número',
      'any.required': 'La contraseña es obligatoria',
    }),
  role: Joi.string().valid('admin', 'sales').default('sales').messages({
    'any.only': 'El rol debe ser "admin" o "sales"',
    'string.base': 'El rol debe ser un texto',
  }),
  active: Joi.boolean().default(true).messages({
    'boolean.base': 'El campo activo debe ser verdadero o falso',
  }),
}).unknown(false);

export const updateUserSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().messages({
    'string.base': 'El email debe ser un texto',
    'string.email': 'El email debe ser válido',
  }),
  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*\d)/)
    .messages({
      'string.base': 'La contraseña debe ser un texto',
      'string.min': 'La contraseña debe tener al menos 8 caracteres',
      'string.pattern.base':
        'La contraseña debe tener 8+ caracteres, 1 mayúscula, 1 número',
    }),
  role: Joi.string().valid('admin', 'sales').messages({
    'any.only': 'El rol debe ser "admin" o "sales"',
    'string.base': 'El rol debe ser un texto',
  }),
  active: Joi.boolean().messages({
    'boolean.base': 'El campo activo debe ser verdadero o falso',
  }),
}).unknown(false);
