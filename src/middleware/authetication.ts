import { Request, Response, NextFunction } from "express";
import { config } from '../config';
import { Params, QueryParams } from '../types';

export const authenticate = (req: Request<Params, unknown, Body, QueryParams>, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('bearer ')) {
    res.status(401).json({ message: 'Unauthorized' });
    return
  }

  const token = authHeader?.split(' ')[1];

  if (token !== config.authToken) {
    res.status(403).json({ message: 'Forbidden' });
    return
  }

  next();
};