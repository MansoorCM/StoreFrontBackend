import { Order, OrderStore, OrderProduct } from '../../models/order';
import { User, UserStore } from '../../models/user';
import { Product, ProductStore } from '../../models/product';

const store = new OrderStore();

//user and product stores are used because inorder to perfrom operations associated with orders we need a user and a product.
const userStore = new UserStore();
const productStore = new ProductStore();

describe('Order model', () => {

    
    const order: Order = {userid: 1, status: 'active'}
    const user: User = {firstname: 'ray', lastname: 'dalio', password: 'bridgewater123'}
    const product: Product = {name: 'product1', price: 20, category: 'premium'}
    const orderproduct: OrderProduct = {orderid: 1, quantity: 20, productid: 1}
    
    afterAll( async()=> {
        await store.deleteAll();
        await userStore.deleteAll();
        await productStore.deleteAll();
    })

    it('should have an show method', async() => {
        expect(store.show).toBeDefined();
    })
    
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    })
    
    it('should have an addProduct method', () => {
        expect(store.addProduct).toBeDefined();
    })
    
    it('create method should create an order', async() => {
        const newUser = await userStore.create(user)
        user.id = newUser.id
        order.userid = newUser.id as unknown as number
        
        const result: Order = await store.create(order)
        expect(result.userid).toEqual(order.userid);
        expect(result.status).toEqual(order.status);
    })
    
    it('adds product to the order', async() => {
        const newProduct = await productStore.create(product)
        orderproduct.orderid = order.userid
        orderproduct.productid = newProduct.id as unknown as number
        const result: OrderProduct = await store.addProduct(orderproduct.orderid, orderproduct.quantity as unknown as string,
        newProduct.id as unknown as number)
        expect(result.orderid as unknown as number).toEqual(orderproduct.orderid);
        expect(result.quantity).toEqual(orderproduct.quantity);
        expect(result.productid  as unknown as number).toEqual(orderproduct.productid);
    })
        
    it('show method returns the order with the given id', async() => {
        const result = (await store.show(order.userid as unknown as string))[0]
        expect(result.orderid  as unknown as number).toEqual(orderproduct.orderid);
        expect(result.quantity).toEqual(orderproduct.quantity);
        expect(result.productid  as unknown as number).toEqual(orderproduct.productid);
    })

})