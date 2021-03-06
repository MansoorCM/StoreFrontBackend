import Client from '../database';

export type Product = {
  id?: string;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get product ${id}. Error: ${err}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const sql = `INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *`;
      const conn = await Client.connect();

      const result = await conn.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product ${product.name}. Error: ${err}`);
    }
  }

  //for testing purposes only and not used for any endpoints.
  async deleteAll(): Promise<void> {
    try {
      const sql = 'DELETE FROM products';

      const conn = await Client.connect();
      await conn.query(sql);
      conn.release();
    } catch (err) {
      throw new Error(`could not delete all product records. Error ${err}`);
    }
  }
}
