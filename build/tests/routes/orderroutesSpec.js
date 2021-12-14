"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const product_1 = require("../../models/product");
const server_1 = __importDefault(require("../../server"));
const user_1 = require("../../models/user");
const order_1 = require("../../models/order");
const request = (0, supertest_1.default)(server_1.default);
describe('product route', () => {
    let token;
    const productStore = new product_1.ProductStore();
    const userStore = new user_1.UserStore();
    const orderStore = new order_1.OrderStore();
    const user = {
        firstname: 'ray',
        lastname: 'dalio',
        password: 'bridgewater123',
    };
    const product = { name: 'product1', price: 20, category: 'premium' };
    beforeAll(async () => {
        const result = await request
            .post('/user')
            .send({
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password,
        });
        token = result.body;
        const newUser = (await request.get('/user').set('Authorization', 'Bearer ' + token)).body[0];
        user.id = newUser.id;
        const newProduct = (await request
            .post('/product')
            .send({
            name: product.name,
            price: product.price,
            category: product.category,
        })
            .set('Authorization', 'Bearer ' + token)).body;
        product.id = result.body.id;
    });
    afterAll(async () => {
        await orderStore.deleteAll();
        await productStore.deleteAll();
        await userStore.deleteAll();
    });
    it('create method creates a new order', async () => {
        const result = await request
            .post('/order')
            .send({ id: user.id, status: 'active' })
            .set('Authorization', 'Bearer ' + token);
        expect(result.status).toBe(200);
    });
    it('addProduct route adds a new product to an active order', async () => {
        const result = await request
            .post('/order/product')
            .send({ id: user.id, quantity: 20, productid: product.id })
            .set('Authorization', 'Bearer ' + token);
        expect(result.status).toBe(200);
    });
    it('show method returns all products in the active order of the given user.', async () => {
        const result = await request
            .get('/order/' + user.id)
            .set('Authorization', 'Bearer ' + token);
        expect(result.status).toBe(200);
    });
});
