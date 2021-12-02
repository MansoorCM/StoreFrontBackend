// @ts-ignore
import Client from '../database'
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { QueryResult } from 'pg';
// import { Order } from './order';


dotenv.config()

export type User = {
  firstname: string,
  lastname: string,
  password: string;
}

const {
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
} = process.env

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'
  
      const result = await conn.query(sql)
  
      conn.release()
  
      return result.rows 
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`)
    }
  }

  async show(id: string): Promise<User> {
    try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not get user ${id}. Error: ${err}`)
    }
  }

  async create(user: User): Promise<User> {
    try {
        const sql = `INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *`
        
        const conn = await Client.connect()

        const hash = bcrypt.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string))

        const result = await conn.query(sql, [user.firstname, user.lastname, hash])

        conn.release()

        return result.rows[0] 
    } catch (err) {
        throw new Error(`Could not add user ${user.firstname}. Error: ${err}`)
    }
  }

//   async authenticate(user: User): Promise<User | null>  {
//       try{
//         const sql = 'SELECT * FROM users WHERE username = ($1)';
//         const conn = await Client.connect()

//         const result = await conn.query(sql, [user.username])

//         conn.release();
        
//         if(result.rows.length){
//           const retrivedUser = result.rows[0]
//           if(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, retrivedUser.password_digest)){
//             return retrivedUser;
//           }
//         }

//         return null

//       }catch(err){
//         throw new Error(`username or password is incorrect. Error is ${err}`)
//       }
//   }

}