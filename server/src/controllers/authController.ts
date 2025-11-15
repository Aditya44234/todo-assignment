import { Request, Response, NextFunction } from 'express';
import User from "../models/User"; 
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { authSchemas } from "../utils/zodSchemas";
import { logger } from "../middleware/logger";

// Signup
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        authSchemas.signup.parse(req.body);

        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ error: "Email already exists" });

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ email, password: hash });

        res.status(201).json({
            message: "User created",
            user: { email: user.email, id: user._id }
        });
    } catch (error: any) {
        logger("error", error.message, error.stack, req);
        next(error);
    }
};

// Login
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        authSchemas.login.parse(req.body);

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: "2d" }
        );

        res.json({ token });
    } catch (error: any) {
        logger("error", error.message, error.stack, req);
        next(error);
    }
};

// Forgot Password (stub for now)
export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Implement email sending and token storage
    res.json({ message: "Forgot password flow to be implemented." });
};

// Reset Password (stub for now)
export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    // TODO: Implement token verification and password update
    res.json({ message: "Reset password flow to be implemented." });
};
