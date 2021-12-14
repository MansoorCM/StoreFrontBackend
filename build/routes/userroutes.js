"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyauthtoken_1 = require("../utilities/verifyauthtoken");
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
        const user = {
            firstname: firstname,
            lastname: lastname,
            password: password,
        };
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ result: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const userRoutes = (app) => {
    app.get('/user', verifyauthtoken_1.verifyAuthToken, index);
    app.get('/user/:id', verifyauthtoken_1.verifyAuthToken, show);
    app.post('/user', create);
};
exports.userRoutes = userRoutes;
