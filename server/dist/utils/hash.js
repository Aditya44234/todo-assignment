"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashpassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashpassword = async (password) => {
    return await bcryptjs_1.default.hash(password, 10);
};
exports.hashpassword = hashpassword;
const comparePassword = async (password, hash) => {
    return await bcryptjs_1.default.compare(password, hash);
};
exports.comparePassword = comparePassword;
