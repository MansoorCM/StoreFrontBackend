"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
const order_1 = require("../models/order");
const verifyauthtoken_1 = require("../utilities/verifyauthtoken");
const store = new order_1.OrderStore();
const show = async (req, res) => {
    try {
        const userid = req.params.id;
        const result = await store.show(userid);
        res.send(result);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const userid = req.body.id;
        const status = req.body.status;
        const order = { userid: userid, status: status };
        const result = await store.create(order);
        res.send(result);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProduct = async (req, res) => {
    try {
        const userid = req.body.id;
        const quantity = req.body.quantity;
        const productid = req.body.productid;
        const result = await store.addProduct(userid, quantity, productid);
        res.send(result);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/order/:id', verifyauthtoken_1.verifyAuthToken, show);
    app.post('/order', verifyauthtoken_1.verifyAuthToken, create);
    app.post('/order/product', verifyauthtoken_1.verifyAuthToken, addProduct);
};
exports.orderRoutes = orderRoutes;
