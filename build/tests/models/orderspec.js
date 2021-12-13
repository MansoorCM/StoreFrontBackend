"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../../models/order");
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const store = new order_1.OrderStore();
//user and product stores are used because inorder to perfrom operations associated with orders we need a user and a product.
const userStore = new user_1.UserStore();
const productStore = new product_1.ProductStore();
describe('Order model', () => {
    const order = { userid: 1, status: 'active' };
    const user = { firstname: 'ray', lastname: 'dalio', password: 'bridgewater123' };
    const product = { name: 'product1', price: 20, category: 'premium' };
    const orderproduct = { orderid: 1, quantity: 20, productid: 1 };
    afterAll(async () => {
        await store.deleteAll();
        await userStore.deleteAll();
        await productStore.deleteAll();
    });
    it('should have an show method', async () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have an addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    });
    it('create method should create an order', async () => {
        const newUser = await userStore.create(user);
        user.id = newUser.id;
        order.userid = newUser.id;
        const result = await store.create(order);
        expect(result.userid).toEqual(order.userid);
        expect(result.status).toEqual(order.status);
    });
    it('adds product to the order', async () => {
        const newProduct = await productStore.create(product);
        orderproduct.orderid = order.userid;
        orderproduct.productid = newProduct.id;
        const result = await store.addProduct(orderproduct.orderid, orderproduct.quantity, newProduct.id);
        expect(result.orderid).toEqual(orderproduct.orderid);
        expect(result.quantity).toEqual(orderproduct.quantity);
        expect(result.productid).toEqual(orderproduct.productid);
    });
    it('show method returns the order with the given id', async () => {
        const result = (await store.show(order.userid))[0];
        expect(result.orderid).toEqual(orderproduct.orderid);
        expect(result.quantity).toEqual(orderproduct.quantity);
        expect(result.productid).toEqual(orderproduct.productid);
    });
});
