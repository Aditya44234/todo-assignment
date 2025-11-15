"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const logger_1 = require("./logger");
// Must take 4 params: (err, req, res, next)
const errorMiddleware = (err, req, res, next) => {
    (0, logger_1.logger)('error', err.message, err.stack, req);
    res.status(err.status || 500).json({ error: err.message || 'Server error' });
};
exports.errorMiddleware = errorMiddleware;
