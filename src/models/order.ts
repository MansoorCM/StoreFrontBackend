// @ts-ignore
import { QueryResult } from 'pg'
import Client from '../database'

export type Order = {
  id?: string;
  productid: number;
  quantity: number; 
  status: string;
  userid: number;
}

export class OrderStore {
//   async index(): Promise<Order[]> {
//     try {
//       // @ts-ignore
//       const conn = await Client.connect()
//       const sql = 'SELECT * FROM orders'
  
//       const result = await conn.query(sql)
  
//       conn.release()
  
//       return result.rows 
//     } catch (err) {
//       throw new Error(`Could not get orders. Error: ${err}`)
//     }
//   }

  async show(id: string): Promise<Order> {
    try {
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        // @ts-ignore
        const conn = await Client.connect()

        const result = await conn.query(sql, [id])

        conn.release()

        return result.rows[0]
    } catch (err) {
        throw new Error(`Could not get order ${id}. Error: ${err}`)
    }
  }

//   async create(order: Order): Promise<Order> {
//     try {
//         const sql = `INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *`
//         // @ts-ignore
//         const conn = await Client.connect()
        
//         const result = await conn.query(sql, [order.status, order.userid])
//         conn.release()

//         return result.rows[0] 
//     } catch (err) {
//         throw new Error(`Could not add order to user with id ${order.userid}. Error: ${err}`)
//     }
//   }

//   async delete(id: string): Promise<Order> {
//     try {
//       const sql = 'DELETE FROM orders WHERE id=($1)'
//         // @ts-ignore
//         const conn = await Client.connect()

//         const result = await conn.query(sql, [id])

//         const order = result.rows[0]

//         conn.release()

//         return order  
//     } catch (err) {
//         throw new Error(`Could not delete order ${id}. Error: ${err}`)
//     }
//   }

//   async createProduct(orderid: number, quantity: string, productid: number): Promise<QueryResult> {
//     try {
//         const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *`
//         // @ts-ignore
//         const conn = await Client.connect()

//         const orderquery = 'SELECT * FROM orders WHERE id = ($1)'
//         const order: Order = (await conn.query(orderquery, [orderid])).rows[0]

//         let result;
//         if (order.status == 'open'){
//             result = (await conn.query(sql, [quantity, orderid, productid])).rows[0]
//         }else{
//             result = 'order is closed'
//         }

//         conn.release()

//         return result
//     } catch (err) {
//         throw new Error(`Could not add product to order with id ${orderid}. Error: ${err}`)
//     }
//   }
}