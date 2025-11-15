"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env"); // Make sure JWT_SECRET is imported, not required
// Auth middleware
const authMiddleware = (req, res, next) => {
    // Get Bearer token
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ')
        ? authHeader.split(' ')[1]
        : undefined;
    if (!token)
        return res.status(401).json({ error: 'No token' });
    try {
        // JWT_SECRET should be a string, not an object from require
        const decoded = jsonwebtoken_1.default.verify(token, env_1.JWT_SECRET);
        req.user = decoded; // Attach decoded token info to req.user
        next();
    }
    catch (error) {
        res.status(401).json({ error: 'Token invalid' });
    }
};
exports.authMiddleware = authMiddleware;
