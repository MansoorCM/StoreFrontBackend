"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// middleware to verify the auth token.
const verifyAuthToken = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jsonwebtoken_1.default.verify(token?.split(' ')[1], process.env.TOKEN_SECRET);
        next();
    }
    catch (err) {
        res.status(401);
        res.json('token verification failed');
        return;
    }
};
exports.verifyAuthToken = verifyAuthToken;
