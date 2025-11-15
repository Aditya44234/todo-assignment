import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env'; // Make sure JWT_SECRET is imported, not required

declare global {
    namespace Express {
        interface Request {
            user?: { id: string; email: string };
        }
    }
}

// Auth middleware
export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Get Bearer token
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : undefined;

    if (!token) return res.status(401).json({ error: 'No token' });

    try {
        // JWT_SECRET should be a string, not an object from require
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
        req.user = decoded; // Attach decoded token info to req.user
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token invalid' });
    }
};
