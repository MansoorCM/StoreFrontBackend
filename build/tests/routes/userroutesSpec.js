"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const user_1 = require("../../models/user");
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
describe('User route', () => {
    const user = {
        firstname: 'ray',
        lastname: 'dalio',
        password: 'bridgewater123',
    };
    let token;
    const store = new user_1.UserStore();
    afterAll(async () => {
        await store.deleteAll();
    });
    it('create method adds a User in the database', async () => {
        const result = await request
            .post('/user')
            .send({
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password,
        });
        token = result.body;
        expect(result.status).toBe(200);
    });
    it('index method returns all the users', async () => {
        const result = await request
            .get('/user')
            .set('Authorization', 'Bearer ' + token);
        user.id = result.body[0].id;
        expect(result.status).toBe(200);
    });
    it('show method returns the user with given id', async () => {
        const result = await request
            .get('/user/' + user.id)
            .set('Authorization', 'Bearer ' + token);
        expect(result.status).toBe(200);
    });
});
