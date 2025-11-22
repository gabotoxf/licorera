const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { auth, adminAuth } = require('../middleware/auth');
const { body } = require('express-validator');

// Validaciones
const categoryValidation = [
  body('nombre').notEmpty().withMessage('El nombre de la categoría es requerido'),
  body('descripcion').optional().isLength({ max: 500 }).withMessage('La descripción no puede exceder 500 caracteres')
];

// Rutas públicas
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/products', categoryController.getCategoryProducts);

// Rutas protegidas (solo admin)
router.post('/', auth, adminAuth, categoryValidation, categoryController.createCategory);
router.put('/:id', auth, adminAuth, categoryValidation, categoryController.updateCategory);
router.delete('/:id', auth, adminAuth, categoryController.deleteCategory);

module.exports = router;