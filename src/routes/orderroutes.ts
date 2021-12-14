import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';
import { verifyAuthToken } from '../utilities/verifyauthtoken';

const store = new OrderStore();

const show = async (req: Request, res: Response) => {
  try {
    const userid = req.params.id as string;
    const result = await store.show(userid);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const userid = req.body.id as number;
    const status = req.body.status as string;
    const order: Order = { userid: userid, status: status };
    const result = await store.create(order);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const userid = req.body.id as number;
    const quantity = req.body.quantity as number;
    const productid = req.body.productid as number;
    const result = await store.addProduct(userid, quantity, productid);
    res.send(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

export const orderRoutes = (app: express.Application) => {
  app.get('/order/:id', verifyAuthToken, show);
  app.post('/order', verifyAuthToken, create);
  app.post('/order/product', verifyAuthToken, addProduct);
};
