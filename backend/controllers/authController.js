const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { validationResult } = require('express-validator');

const authController = {
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { nombre, apellido, email, password, fecha_nacimiento, telefono, direccion } = req.body;

      // Verificar si el usuario ya existe
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'El usuario ya existe' });
      }

      // Hash password
      const password_hash = await bcrypt.hash(password, 12);

      // Crear usuario
      await User.create({
        nombre,
        apellido,
        email,
        password_hash,
        fecha_nacimiento,
        telefono,
        direccion,
        tipo_usuario: 'cliente'
      });

      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
  },

  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Verificar usuario
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }

      // Verificar password
      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(400).json({ message: 'Credenciales inválidas' });
      }

      // Generar token
      const token = jwt.sign(
        { userId: user.usuario_id, tipo_usuario: user.tipo_usuario },
        process.env.JWT_SECRET || 'secreto',
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          usuario_id: user.usuario_id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          tipo_usuario: user.tipo_usuario
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Error del servidor', error: error.message });
    }
  }
};

module.exports = authController;