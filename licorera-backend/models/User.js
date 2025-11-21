const pool = require('../config/database');

class User {
  static async create(userData) {
    const { 
      nombre, 
      email, 
      password_hash, 
      apellido, 
      fecha_nacimiento, 
      telefono,
      direccion, 
      tipo_usuario = 'cliente' 
    } = userData;
    
    const [result] = await pool.execute(
      'INSERT INTO usuarios (nombre, email, password_hash, apellido, fecha_nacimiento, telefono, direccion, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, email, password_hash, apellido, fecha_nacimiento, telefono, direccion, tipo_usuario]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.execute(
      'SELECT usuario_id, nombre, apellido, email, fecha_nacimiento, telefono, direccion, tipo_usuario, fecha_registro FROM usuarios WHERE usuario_id = ?',
      [id]
    );
    return rows[0];
  }

  static async getAll() {
    const [rows] = await pool.execute(
      'SELECT usuario_id, nombre, apellido, email, fecha_nacimiento, telefono, direccion, tipo_usuario, fecha_registro FROM usuarios ORDER BY nombre'
    );
    return rows;
  }

  static async update(id, userData) {
    const { nombre, apellido, email, fecha_nacimiento, telefono, direccion, tipo_usuario } = userData;
    
    let query = 'UPDATE usuarios SET ';
    const params = [];
    const updates = [];

    if (nombre !== undefined) {
      updates.push('nombre = ?');
      params.push(nombre);
    }
    if (apellido !== undefined) {
      updates.push('apellido = ?');
      params.push(apellido);
    }
    if (email !== undefined) {
      updates.push('email = ?');
      params.push(email);
    }
    if (fecha_nacimiento !== undefined) {
      updates.push('fecha_nacimiento = ?');
      params.push(fecha_nacimiento);
    }
    if (telefono !== undefined) {
      updates.push('telefono = ?');
      params.push(telefono);
    }
    if (direccion !== undefined) {
      updates.push('direccion = ?');
      params.push(direccion);
    }
    if (tipo_usuario !== undefined) {
      updates.push('tipo_usuario = ?');
      params.push(tipo_usuario);
    }

    if (updates.length === 0) {
      throw new Error('No se proporcionaron campos para actualizar');
    }

    query += updates.join(', ') + ' WHERE usuario_id = ?';
    params.push(id);

    const [result] = await pool.execute(query, params);
    return result;
  }

  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM usuarios WHERE usuario_id = ?',
      [id]
    );
    return result;
  }
}

module.exports = User;