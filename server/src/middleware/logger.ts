import Log from '../models/Log';
import { Request } from 'express';

// Make logger take req as optional
export const logger = async (
    level: string,
    message: string,
    stack?: string,
    req?: Request
) => {
    await Log.create({
        level,
        message,
        stack,
        meta: req
            ? {
                url: req.originalUrl,
                method: req.method,
                body: req.body,
                user: req.user, 
            }
            : undefined,
    });
};
