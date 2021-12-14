import supertest from 'supertest';
import { Product, ProductStore } from '../../models/product';
import app from '../../server';
import { User, UserStore } from '../../models/user';
import { Order, OrderStore } from '../../models/order';

const request = supertest(app);

describe('product route', () => {
  let token: string;
  const productStore = new ProductStore();
  const userStore = new UserStore();
  const orderStore = new OrderStore();
  const user: User = {
    firstname: 'ray',
    lastname: 'dalio',
    password: 'bridgewater123',
  };
  const product: Product = { name: 'product1', price: 20, category: 'premium' };

  beforeAll(async () => {
    const result = await request
      .post('/user')
      .send({
        firstname: user.firstname,
        lastname: user.lastname,
        password: user.password,
      });
    token = result.body;
    const newUser = (
      await request.get('/user').set('Authorization', 'Bearer ' + token)
    ).body[0];
    user.id = newUser.id;
    const newProduct = (
      await request
        .post('/product')
        .send({
          name: product.name,
          price: product.price,
          category: product.category,
        })
        .set('Authorization', 'Bearer ' + token)
    ).body;
    product.id = result.body.id;
  });

  afterAll(async () => {
    await orderStore.deleteAll();
    await productStore.deleteAll();
    await userStore.deleteAll();
  });

  it('create method creates a new order', async () => {
    const result = await request
      .post('/order')
      .send({ id: user.id, status: 'active' })
      .set('Authorization', 'Bearer ' + token);
    expect(result.status).toBe(200);
  });

  it('addProduct route adds a new product to an active order', async () => {
    const result = await request
      .post('/order/product')
      .send({ id: user.id, quantity: 20, productid: product.id })
      .set('Authorization', 'Bearer ' + token);
    expect(result.status).toBe(200);
  });

  it('show method returns all products in the active order of the given user.', async () => {
    const result = await request
      .get('/order/' + user.id)
      .set('Authorization', 'Bearer ' + token);
    expect(result.status).toBe(200);
  });
});
