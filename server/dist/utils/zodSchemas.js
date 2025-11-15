"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSchemas = exports.authSchemas = void 0;
const zod_1 = __importDefault(require("zod"));
exports.authSchemas = {
    signup: zod_1.default.object({
        email: zod_1.default.string().email(),
        password: zod_1.default.string().min(6)
    }),
    login: zod_1.default.object({
        email: zod_1.default.string().email(),
        password: zod_1.default.string(),
    }),
};
exports.todoSchemas = {
    create: zod_1.default.object({
        title: zod_1.default.string().min(1),
        description: zod_1.default.string().optional(),
    }),
    update: zod_1.default.object({
        title: zod_1.default.string().min(1).optional(),
        description: zod_1.default.string().optional(),
        completed: zod_1.default.boolean().optional(),
    }),
};
