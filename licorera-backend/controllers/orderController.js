const Order = require('../models/Order');
const { validationResult } = require('express-validator');

const orderController = {
  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { items, total } = req.body;
      const orderData = {
        usuario_id: req.user.userId,
        total,
        items
      };

      const orderId = await Order.create(orderData);
      res.status(201).json({ 
        message: 'Pedido creado exitosamente', 
        orderId 
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear pedido', error: error.message });
    }
  },

  async getMyOrders(req, res) {
    try {
      const orders = await Order.getByUserId(req.user.userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const order = await Order.getById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: 'Pedido no encontrado' });
      }

      // Verificar que el usuario sea el dueño del pedido o admin
      if (order.usuario_id !== req.user.userId && req.user.rol !== 'admin') {
        return res.status(403).json({ message: 'No tienes permiso para ver este pedido' });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener pedido', error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const orders = await Order.getAll();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
    }
  },

  async updateStatus(req, res) {
    try {
      const { status } = req.body;
      const validStatuses = ['pendiente', 'confirmado', 'preparando', 'enviado', 'entregado', 'cancelado'];
      
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Estado de pedido inválido' });
      }

      await Order.updateStatus(req.params.id, status);
      res.json({ message: 'Estado del pedido actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar estado del pedido', error: error.message });
    }
  }
};

module.exports = orderController;