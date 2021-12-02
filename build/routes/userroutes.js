"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
// import { verifyAuthToken } from './userroutes';
const user_1 = require("../models/user");
const store = new user_1.UserStore();
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
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const password = req.body.password;
        const user = { firstname: firstname, lastname: lastname, password: password };
        const result = await store.create(user);
        res.json(result);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const userRoutes = (app) => {
    app.get('/user', index);
    app.get('/user/:id', show);
    app.post('/user', create);
};
exports.userRoutes = userRoutes;
