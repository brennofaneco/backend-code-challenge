import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup'
import { Params, QueryParams } from '../types';
import { isEmpty } from 'lodash'

export const validateQueryParams = <T extends yup.Maybe<yup.AnyObject>>(schema: yup.ObjectSchema<T>) => {
  return (req: Request<Params, unknown, Body, QueryParams>, res: Response, next: NextFunction) => {
    try {
      if (!isEmpty(req.query)) {
        schema.validateSync(req.query, { abortEarly: false })
      }
      if (!isEmpty(req.params)){
        schema.validateSync(req.params, { abortEarly: false })
      }
      next();  
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(400).json({ errors: error.errors });
      }
      next(error);  
    }
  };
};


