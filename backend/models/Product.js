const pool = require('../config/database');

class Product {
  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.categoria_id 
      ORDER BY p.producto_id
    `);
    return rows;
  }

  static async getById(id) {
    const [rows] = await pool.execute(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.categoria_id 
      WHERE p.producto_id = ? AND p.activo = true
    `, [id]);
    return rows[0];
  }

  static async getByCategory(categoryId) {
    const [rows] = await pool.execute(`
      SELECT p.*, c.nombre as categoria_nombre 
      FROM productos p 
      LEFT JOIN categorias c ON p.categoria_id = c.categoria_id 
      WHERE p.categoria_id = ? AND p.activo = true 
      ORDER BY p.nombre
    `, [categoryId]);
    return rows;
  }

  static async create(productData) {
    const { 
      nombre, 
      descripcion, 
      precio, 
      categoria_id, 
      marca, 
      tipo_licor, 
      pais_origen, 
      grado_alcoholico, 
      stock, 
      imagen_url 
    } = productData;
    
    const [result] = await pool.execute(
      'INSERT INTO productos (nombre, descripcion, precio, categoria_id, marca, tipo_licor, pais_origen, grado_alcoholico, stock, imagen_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, precio, categoria_id, marca, tipo_licor, pais_origen, grado_alcoholico, stock, imagen_url]
    );
    return result;
  }

  static async update(id, productData) {
    const { 
      nombre, 
      descripcion, 
      precio, 
      categoria_id, 
      marca, 
      tipo_licor, 
      pais_origen, 
      grado_alcoholico, 
      stock, 
      imagen_url,
      activo 
    } = productData;
    
    const [result] = await pool.execute(
      'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria_id = ?, marca = ?, tipo_licor = ?, pais_origen = ?, grado_alcoholico = ?, stock = ?, imagen_url = ?, activo = ? WHERE producto_id = ?',
      [nombre, descripcion, precio, categoria_id, marca, tipo_licor, pais_origen, grado_alcoholico, stock, imagen_url, activo, id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await pool.execute(
      'UPDATE productos SET activo = false WHERE producto_id = ?',
      [id]
    );
    return result;
  }

  static async updateStock(id, newStock) {
    const [result] = await pool.execute(
      'UPDATE productos SET stock = ? WHERE producto_id = ?',
      [newStock, id]
    );
    return result;
  }
}

module.exports = Product;