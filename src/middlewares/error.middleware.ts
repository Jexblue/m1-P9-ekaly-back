import { NextFunction, Request, Response } from 'express';
import {HttpError} from "routing-controllers";


const errorMiddleware = (error: HttpError, req: Request, res: Response, next: NextFunction) => {

  try {

    const message: string = error.message || 'Something went wrong';

    console.error(`[${req.method}] ${req.path} >> StatusCode:: 500, Message:: ${message}`);

    console.error(error);

    res.status(500).json({ message });

  } catch (error) {

    next(error);

  }

};

export default errorMiddleware;
