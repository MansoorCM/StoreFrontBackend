"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userroutes_1 = require("./routes/userroutes");
const productroutes_1 = require("./routes/productroutes");
const orderroutes_1 = require("./routes/orderroutes");
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
(0, userroutes_1.userRoutes)(app);
(0, productroutes_1.productRoutes)(app);
(0, orderroutes_1.orderRoutes)(app);
