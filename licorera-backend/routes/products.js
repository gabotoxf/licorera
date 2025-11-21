const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { auth, adminAuth } = require('../middleware/auth');
const { productValidation } = require('../middleware/validation');
const multer = require('multer');

// Configuración de multer para subida de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.get('/category/:categoryId', productController.getByCategory);

// Rutas protegidas
router.post('/', auth, adminAuth, upload.single('imagen'), productValidation, productController.create);
router.put('/:id', auth, adminAuth, upload.single('imagen'), productValidation, productController.update);
router.delete('/:id', auth, adminAuth, productController.delete);

module.exports = router;