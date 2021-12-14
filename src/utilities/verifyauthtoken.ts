import { Request, Response } from 'express';
import Jwt from 'jsonwebtoken';

// middleware to verify the auth token.
export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const token = req.headers.authorization as string;
    Jwt.verify(token?.split(' ')[1], process.env.TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
    res.json('token verification failed');
    return;
  }
};
