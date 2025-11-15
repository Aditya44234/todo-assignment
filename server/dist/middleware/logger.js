"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const Log_1 = __importDefault(require("../models/Log"));
// Make logger take req as optional
const logger = async (level, message, stack, req) => {
    await Log_1.default.create({
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
exports.logger = logger;
