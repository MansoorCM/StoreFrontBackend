"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderStore {
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
    async show(id) {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get order ${id}. Error: ${err}`);
        }
    }
}
exports.OrderStore = OrderStore;
