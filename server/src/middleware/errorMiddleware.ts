import { Request, Response, NextFunction } from 'express';
import { logger } from './logger';

// Must take 4 params: (err, req, res, next)
export const errorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger('error', err.message, err.stack, req);
    res.status(err.status || 500).json({ error: err.message || 'Server error' });
};
