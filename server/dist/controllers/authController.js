"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.login = exports.signup = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const zodSchemas_1 = require("../utils/zodSchemas");
const logger_1 = require("../middleware/logger");
// Signup
const signup = async (req, res, next) => {
    try {
        zodSchemas_1.authSchemas.signup.parse(req.body);
        const { name, email, password } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser)
            return res.status(409).json({ error: "Email already exists" });
        const hash = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({ name, email, password: hash });
        res.status(201).json({
            message: "User created",
            user: { name: name, email: user.email, id: user._id }
        });
    }
    catch (error) {
        (0, logger_1.logger)("error", error.message, error.stack, req);
        next(error);
    }
};
exports.signup = signup;
// Login
const login = async (req, res, next) => {
    try {
        zodSchemas_1.authSchemas.login.parse(req.body);
        const { email, password } = req.body;
        const user = await User_1.default.findOne({ email });
        if (!user)
            return res.status(401).json({ error: "Invalid credentials" });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ error: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, env_1.JWT_SECRET, { expiresIn: "2d" });
        res.json({ token });
    }
    catch (error) {
        (0, logger_1.logger)("error", error.message, error.stack, req);
        next(error);
    }
};
exports.login = login;
// Forgot Password (stub for now)
const forgotPassword = async (req, res, next) => {
    // TODO: Implement email sending and token storage, i will ompletment them later bro
    res.json({ message: "Forgot password flow to be implemented." });
};
exports.forgotPassword = forgotPassword;
// Reset Password (stub for now)
const resetPassword = async (req, res, next) => {
    // TODO: Implement token verification and password update. i will impletment thos later broo
    res.json({ message: "Reset password flow to be implemented." });
};
exports.resetPassword = resetPassword;
