"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
class UserStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM users';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`Could not get users. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM users WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not get user ${id}. Error: ${err}`);
        }
    }
    async create(user) {
        try {
            const sql = `INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *`;
            const conn = await database_1.default.connect();
            const hash = bcrypt_1.default.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS));
            const result = await conn.query(sql, [
                user.firstname,
                user.lastname,
                hash,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add user ${user.firstname}. Error: ${err}`);
        }
    }
    //for testing purposes only and not used for any endpoints.
    async deleteAll() {
        try {
            const sql = 'DELETE FROM users';
            const conn = await database_1.default.connect();
            await conn.query(sql);
            conn.release();
        }
        catch (err) {
            throw new Error(`could not delete all user records. Error ${err}`);
        }
    }
}
exports.UserStore = UserStore;
