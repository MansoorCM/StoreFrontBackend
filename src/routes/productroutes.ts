import express, {Request, Response} from 'express';
import { Product, ProductStore } from '../models/product';
// import { verifyAuthToken } from './userroutes';

const store = new ProductStore();

const index = async(req: Request, res: Response) =>{

    try{
        const list = await store.index();
        res.json(list)
    }catch(err){
        res.status(400)
        res.json(err)    
    }

}

const show = async(req: Request, res: Response) =>{
    try{
        const id = req.params.id as string
        const result = await store.show(id);
        res.send(result)
    }catch(err){
        res.status(400)
        res.json(err)    
    }
}

const create = async(req: Request, res: Response) =>{
    try{
        const name = req.body.name as string
        const price = (req.body.price as unknown ) as number
        const category = req.body.category as string
        
        const product: Product = {name: name, price: price, category: category}
        const result = await store.create(product)
        res.json(result) 
    }catch(err){
        res.status(400)
        res.json(err)    
    }
}

export const productRoutes = (app: express.Application) =>{
    app.get('/product', index)
    app.get('/product/:id', show)
    app.post('/product', create)
}