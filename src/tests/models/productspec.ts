import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product model', () => {
  const product: Product = { name: 'product1', price: 20, category: 'premium' };

  afterAll(async () => {
    await store.deleteAll();
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('index function should return empty array', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it('create method adds a product in the database', async () => {
    const result: Product = await store.create(product);
    expect(result.name).toEqual(product.name);
    expect(result.price).toEqual(product.price);
    expect(result.category).toEqual(product.category);
    product.id = result.id;
  });

  it('show method returns the product with the given id', async () => {
    const result: Product = await store.show(product.id as unknown as string);
    expect(result.name).toEqual(product.name);
    expect(result.price).toEqual(product.price);
    expect(result.category).toEqual(product.category);
  });
});
