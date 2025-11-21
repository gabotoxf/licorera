const Product = require('../models/Product');
const { validationResult } = require('express-validator');

const productController = {
  async getAll(req, res) {
    try {
      const products = await Product.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.getById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener producto', error: error.message });
    }
  },

  async getByCategory(req, res) {
    try {
      const products = await Product.getByCategory(req.params.categoryId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
  },

  async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const productData = req.body;
      // Si hay archivo subido
      if (req.file) {
        productData.imagen = `/uploads/${req.file.filename}`;
      }

      const result = await Product.create(productData);
      res.status(201).json({ message: 'Producto creado', id: result.insertId });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear producto', error: error.message });
    }
  },

  async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const productData = req.body;
      if (req.file) {
        productData.imagen = `/uploads/${req.file.filename}`;
      }

      await Product.update(req.params.id, productData);
      res.json({ message: 'Producto actualizado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await Product.delete(req.params.id);
      res.json({ message: 'Producto eliminado' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
    }
  }
};

module.exports = productController;