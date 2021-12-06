import express, {Request, Response} from 'express';
import { User, UserStore } from '../models/user';
import Jwt from 'jsonwebtoken';
import { verifyAuthToken } from '../utilities/verifyauthtoken';

const store = new UserStore();

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
        const firstname = req.body.firstname as string
        const lastname = req.body.lastname as string
        const password = req.body.password as string
        
        const user: User = {firstname: firstname, lastname: lastname, password: password}
        const newUser = await store.create(user)

        const token = Jwt.sign( {result : newUser}, ( process.env.TOKEN_SECRET ) as string)
        res.json(token) 
    }catch(err){
        res.status(400)
        res.json(err)    
    }
}

export const userRoutes = (app: express.Application) =>{
    app.get('/user', verifyAuthToken, index)
    app.get('/user/:id', verifyAuthToken, show)
    app.post('/user', create)
}