"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../models/user");
const store = new user_1.UserStore();
describe('User model', () => {
    const user = {
        firstname: 'ray',
        lastname: 'dalio',
        password: 'bridgewater123',
    };
    afterAll(async () => {
        await store.deleteAll();
    });
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('index function should return empty array', async () => {
        const result = await store.index();
        expect(result).toEqual([]);
    });
    it('create method adds a User in the database', async () => {
        const result = await store.create(user);
        expect(result.firstname).toEqual(user.firstname);
        expect(result.lastname).toEqual(user.lastname);
        user.id = result.id;
    });
    it('show method returns the User with the given id', async () => {
        const result = await store.show(user.id);
        expect(result.firstname).toEqual(user.firstname);
        expect(result.lastname).toEqual(user.lastname);
    });
});
