"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const product_1 = require("../../models/product");
const server_1 = __importDefault(require("../../server"));
const user_1 = require("../../models/user");
const request = (0, supertest_1.default)(server_1.default);
describe('product route', () => {
    const product = { name: 'product1', price: 20, category: 'premium' };
    let token;
    const store = new product_1.ProductStore();
    const userStore = new user_1.UserStore();
    beforeAll(async () => {
        const user = { firstname: 'ray', lastname: 'dalio', password: 'bridgewater123' };
        const result = await request.post('/user')
            .send({ firstname: user.firstname, lastname: user.lastname, password: user.password });
        token = result.body;
    });
    afterAll(async () => {
        await store.deleteAll();
        await userStore.deleteAll();
    });
    it('create method adds a product in the database', async () => {
        const result = await request.post('/product')
            .send({ name: product.name, price: product.price, category: product.category }).set('Authorization', 'Bearer ' + token);
        expect(result.status).toBe(200);
    });
    it('index method returns all the products', async () => {
        const result = await request.get('/product');
        product.id = result.body[0].id;
        expect(result.status).toBe(200);
    });
    it('show method returns the product with given id', async () => {
        const result = await request.get('/product/' + product.id);
        expect(result.status).toBe(200);
    });
});
