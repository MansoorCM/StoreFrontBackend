import Client from '../database';

export type Order = {
  id?: string;
  status: string;
  userid: number;
};

export type OrderProduct = {
  id?: string;
  quantity: number;
  orderid: number;
  productid: number;
};

export class OrderStore {
  async show(id: string): Promise<OrderProduct[]> {
    try {
      const sql = 'SELECT * FROM orders WHERE userid=($1) AND status=($2)';

      const conn = await Client.connect();

      const order: Order = (
        await conn.query(sql, [id as unknown as number, 'active'])
      ).rows[0];
      if (order == null) {
        return [];
      }

      const orderproductssql =
        'SELECT * FROM order_products WHERE orderid=($1)';
      const result = await conn.query(orderproductssql, [order.id]);
      const orderproducts: OrderProduct[] = result.rows;

      conn.release();
      return orderproducts;
    } catch (err) {
      throw new Error(`Could not get order ${id}. Error: ${err}`);
    }
  }

  async create(order: Order): Promise<Order> {
    try {
      const sql = `INSERT INTO orders (status, userid) VALUES($1, $2) RETURNING *`;
      const conn = await Client.connect();

      const result = await conn.query(sql, [order.status, order.userid]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not add order to user with id ${order.userid}. Error: ${err}`
      );
    }
  }

  async addProduct(
    userid: number,
    quantity: number,
    productid: number
  ): Promise<OrderProduct> {
    try {
      const ordersql = 'SELECT * FROM orders WHERE userid=($1) AND status=($2)';

      const conn = await Client.connect();

      const orderlist = await conn.query(ordersql, [userid, 'active']);

      // the orderid of the user with given id. Also the 'orderlist' will only have one item.
      const orderid = orderlist.rows[0].id;
      const sql = `INSERT INTO order_products (quantity, orderid, productid) VALUES($1, $2, $3) RETURNING *`;

      const result: OrderProduct = (
        await conn.query(sql, [quantity, orderid, productid])
      ).rows[0];

      conn.release();

      return result;
    } catch (err) {
      throw new Error(
        `Could not add product to order of user with id ${userid}. Error: ${err}`
      );
    }
  }

  //for testing purposes only and not used for any endpoints.
  async deleteAll(): Promise<void> {
    try {
      const sqlOrderProducts = 'DELETE FROM order_products';

      const conn = await Client.connect();
      await conn.query(sqlOrderProducts);

      const sqlOrders = 'DELETE FROM orders';
      await conn.query(sqlOrders);
      conn.release();
    } catch (err) {
      throw new Error(
        `could not delete all orders and orderproduct records. Error ${err}`
      );
    }
  }
}
