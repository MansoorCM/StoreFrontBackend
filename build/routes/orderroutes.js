"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRoutes = void 0;
// import { verifyAuthToken } from './userroutes';
const order_1 = require("../models/order");
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
const orderRoutes = (app) => {
    app.get('/order/:id', show);
};
exports.orderRoutes = orderRoutes;
