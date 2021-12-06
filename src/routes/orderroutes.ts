import express, {Request, Response} from 'express';
import { Order, OrderStore } from '../models/order';
import { verifyAuthToken } from '../utilities/verifyauthtoken';

const store = new OrderStore();

const show = async(req: Request, res: Response) =>{
    try{
        const userid = req.params.id as string
        const result = await store.show(userid);
        res.send(result)
    }catch(err){
        res.status(400)
        res.json(err)    
    }
}

export const orderRoutes = (app: express.Application) =>{
    app.get('/order/:id', verifyAuthToken, show)
}