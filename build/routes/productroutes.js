"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const product_1 = require("../models/product");
const verifyauthtoken_1 = require("../utilities/verifyauthtoken");
const store = new product_1.ProductStore();
const index = async (req, res) => {
    try {
        const list = await store.index();
        res.json(list);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await store.show(id);
        res.send(result);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
    try {
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;
        const product = { name: name, price: price, category: category };
        const result = await store.create(product);
        res.json(result);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const productRoutes = (app) => {
    app.get('/product', index);
    app.get('/product/:id', show);
    app.post('/product', verifyauthtoken_1.verifyAuthToken, create);
};
exports.productRoutes = productRoutes;
