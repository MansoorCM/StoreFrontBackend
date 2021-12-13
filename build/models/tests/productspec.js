"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const store = new product_1.ProductStore();
describe('Product model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('testing addition', () => {
        expect(2 + 3).toBe(5);
    });
});
