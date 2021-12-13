import supertest from "supertest";
import { Product, ProductStore } from '../../models/product';
import app from "../../server";
import { User, UserStore } from "../../models/user";

const request = supertest(app)

describe('product route', () => {

    const product: Product = {name: 'product1', price: 20, category: 'premium'}
    let token: string
    const store = new ProductStore();
    const userStore = new UserStore();

    beforeAll( async()=> {
        const user: User = {firstname: 'ray', lastname: 'dalio', password: 'bridgewater123'}
        const result = await request.post('/user')
        .send({firstname: user.firstname, lastname: user.lastname, password: user.password})
        token = result.body
    })

    afterAll( async()=> {
        await store.deleteAll();
        await userStore.deleteAll();
    })

    it('create method adds a product in the database', async() => {
        const result = await request.post('/product')
        .send({name: product.name, price: product.price, category: product.category}).set('Authorization', 'Bearer ' + token)
        expect(result.status).toBe(200)
    })

    it('index method returns all the products', async() => {
        const result = await request.get('/product')
        product.id = result.body[0].id
        expect(result.status).toBe(200)
    })
    
    it('show method returns the product with given id', async() => {
        const result = await request.get('/product/' + product.id)
        expect(result.status).toBe(200)
    })
})