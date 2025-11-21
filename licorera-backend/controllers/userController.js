const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const userController = {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { nombre, email, password, telefono, direccion } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Crear usuario
      await User.create({
        nombre,
        email,
        password: hashedPassword,
        telefono,
        direccion
      });

      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
  },

  async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener perfil', error: error.message });
    }
  },

  async updateProfile(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { nombre, telefono, direccion } = req.body;
      await User.update(req.user.userId, { nombre, telefono, direccion });
      
      res.json({ message: 'Perfil actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar perfil', error: error.message });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.getAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
  },

  async updateUser(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { nombre, telefono, direccion, rol } = req.body;
      await User.update(req.params.id, { nombre, telefono, direccion, rol });
      
      res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      await User.delete(req.params.id);
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
  }
};

module.exports = userController;