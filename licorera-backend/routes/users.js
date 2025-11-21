const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth, adminAuth } = require('../middleware/auth');
const { body } = require('express-validator');

// Validaciones
const updateUserValidation = [
  body('nombre').optional().notEmpty().withMessage('El nombre es requerido'),
  body('telefono').optional().isMobilePhone().withMessage('Teléfono inválido'),
  body('direccion').optional().isLength({ min: 5 }).withMessage('La dirección debe tener al menos 5 caracteres')
];

// Rutas públicas
router.post('/register', [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('telefono').optional().isMobilePhone().withMessage('Teléfono inválido')
], userController.register);

// Rutas protegidas
router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, updateUserValidation, userController.updateProfile);

// Rutas de administrador
router.get('/', auth, adminAuth, userController.getAllUsers);
router.get('/:id', auth, adminAuth, userController.getUserById);
router.put('/:id', auth, adminAuth, updateUserValidation, userController.updateUser);
router.delete('/:id', auth, adminAuth, userController.deleteUser);

module.exports = router;