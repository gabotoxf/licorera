const pool = require('../config/database');

class Order {
  static async create(orderData) {
    const { usuario_id, total, items, direccion_envio, metodo_pago, notas } = orderData;
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Crear el pedido
      const [orderResult] = await connection.execute(
        'INSERT INTO pedidos (usuario_id, total, direccion_envio, metodo_pago, notas) VALUES (?, ?, ?, ?, ?)',
        [usuario_id, total, direccion_envio, metodo_pago, notas]
      );
      const orderId = orderResult.insertId;

      // Insertar items del pedido (necesitamos crear esta tabla)
      for (const item of items) {
        await connection.execute(
          'INSERT INTO pedidos_items (pedido_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)',
          [orderId, item.producto_id, item.cantidad, item.precio]
        );

        // Actualizar stock
        await connection.execute(
          'UPDATE productos SET stock = stock - ? WHERE producto_id = ?',
          [item.cantidad, item.producto_id]
        );
      }

      await connection.commit();
      return orderId;

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getByUserId(userId) {
    const [rows] = await pool.execute(`
      SELECT p.* 
      FROM pedidos p
      WHERE p.usuario_id = ?
      ORDER BY p.fecha_pedido DESC
    `, [userId]);
    return rows;
  }

  static async getAll() {
    const [rows] = await pool.execute(`
      SELECT p.*, u.nombre as usuario_nombre, u.apellido as usuario_apellido, u.email
      FROM pedidos p
      LEFT JOIN usuarios u ON p.usuario_id = u.usuario_id
      ORDER BY p.fecha_pedido DESC
    `);
    return rows;
  }

  static async updateStatus(id, status) {
    const [result] = await pool.execute(
      'UPDATE pedidos SET estado = ? WHERE pedido_id = ?',
      [status, id]
    );
    return result;
  }

  static async getById(id) {
    const [rows] = await pool.execute(`
      SELECT p.*, u.nombre as usuario_nombre, u.apellido as usuario_apellido, u.email, u.telefono
      FROM pedidos p
      LEFT JOIN usuarios u ON p.usuario_id = u.usuario_id
      WHERE p.pedido_id = ?
    `, [id]);
    return rows[0];
  }
}

module.exports = Order;