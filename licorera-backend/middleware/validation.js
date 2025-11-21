const { body } = require('express-validator');

const registerValidation = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('apellido').notEmpty().withMessage('El apellido es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('fecha_nacimiento').isDate().withMessage('Fecha de nacimiento inválida'),
  body('telefono').optional().isLength({ min: 8 }).withMessage('Teléfono inválido'),
  body('direccion').notEmpty().withMessage('La dirección es requerida')
];

const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];

const productValidation = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('precio').isFloat({ min: 0 }).withMessage('Precio inválido'),
  body('stock').isInt({ min: 0 }).withMessage('Stock inválido'),
  body('categoria_id').isInt({ min: 1 }).withMessage('Categoría inválida')
];

module.exports = {
  registerValidation,
  loginValidation,
  productValidation
};