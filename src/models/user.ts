import Client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

export type User = {
  id?: string;
  firstname: string;
  lastname: string;
  password: string;
};

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user ${id}. Error: ${err}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql = `INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *`;

      const conn = await Client.connect();

      const hash = bcrypt.hashSync(
        user.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      );

      const result = await conn.query(sql, [
        user.firstname,
        user.lastname,
        hash,
      ]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add user ${user.firstname}. Error: ${err}`);
    }
  }

  //for testing purposes only and not used for any endpoints.
  async deleteAll(): Promise<void> {
    try {
      const sql = 'DELETE FROM users';

      const conn = await Client.connect();
      await conn.query(sql);
      conn.release();
    } catch (err) {
      throw new Error(`could not delete all user records. Error ${err}`);
    }
  }
}
