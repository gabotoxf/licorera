const Category = require('../models/Category');
const Product = require('../models/Product');
const { validationResult } = require('express-validator');

const categoryController = {
  async getAllCategories(req, res) {
    try {
      const categories = await Category.getAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener categorías', error: error.message });
    }
  },

  async getCategoryById(req, res) {
    try {
      const category = await Category.getById(req.params.id);
      if (!category) {
        return res.status(404).json({ message: 'Categoría no encontrada' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener categoría', error: error.message });
    }
  },

  async getCategoryProducts(req, res) {
    try {
      const products = await Product.getByCategory(req.params.id);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener productos de la categoría', error: error.message });
    }
  },

  async createCategory(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { nombre, descripcion } = req.body;
      const result = await Category.create({ nombre, descripcion });
      
      res.status(201).json({ 
        message: 'Categoría creada exitosamente', 
        id: result.insertId 
      });
    } catch (error) {
      res.status(500).json({ message: 'Error al crear categoría', error: error.message });
    }
  },

  async updateCategory(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { nombre, descripcion } = req.body;
      await Category.update(req.params.id, { nombre, descripcion });
      
      res.json({ message: 'Categoría actualizada exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar categoría', error: error.message });
    }
  },

  async deleteCategory(req, res) {
    try {
      // Verificar si la categoría tiene productos asociados
      const products = await Product.getByCategory(req.params.id);
      if (products.length > 0) {
        return res.status(400).json({ 
          message: 'No se puede eliminar la categoría porque tiene productos asociados' 
        });
      }

      await Category.delete(req.params.id);
      res.json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar categoría', error: error.message });
    }
  }
};

module.exports = categoryController;