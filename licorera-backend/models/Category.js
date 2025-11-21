const pool = require('../config/database');

class Category {
  static async getAll() {
    const [rows] = await pool.execute(
      'SELECT * FROM categorias ORDER BY nombre'
    );
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.execute(
      'SELECT * FROM categorias WHERE categoria_id = ?',
      [id]
    );
    return rows[0];
  }

  static async create(categoryData) {
    const { nombre, descripcion, imagen_url } = categoryData;
    const [result] = await pool.execute(
      'INSERT INTO categorias (nombre, descripcion, imagen_url) VALUES (?, ?, ?)',
      [nombre, descripcion, imagen_url]
    );
    return result;
  }

  static async update(id, categoryData) {
    const { nombre, descripcion, imagen_url } = categoryData;
    const [result] = await pool.execute(
      'UPDATE categorias SET nombre = ?, descripcion = ?, imagen_url = ? WHERE categoria_id = ?',
      [nombre, descripcion, imagen_url, id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await pool.execute(
      'DELETE FROM categorias WHERE categoria_id = ?',
      [id]
    );
    return result;
  }
}

module.exports = Category;