"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_js_1 = require("../config/env.js"); // Use .js if compiled, or .ts if pure TS
// Sign JWT with proper expiry
const signJWT = (payload) => jsonwebtoken_1.default.sign(payload, env_js_1.JWT_SECRET, { expiresIn: "1d" }); // Use "1d" for one day
exports.signJWT = signJWT;
// Verify JWT and return decoded payload
const verifyJWT = (token) => jsonwebtoken_1.default.verify(token, env_js_1.JWT_SECRET);
exports.verifyJWT = verifyJWT;
