const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, adminAuth } = require('../middleware/auth');

router.post('/', auth, orderController.create);
router.get('/my-orders', auth, orderController.getMyOrders);
router.get('/:id', auth, orderController.getById);

// Rutas de admin
router.get('/', auth, adminAuth, orderController.getAll);
router.put('/:id/status', auth, adminAuth, orderController.updateStatus);

module.exports = router;