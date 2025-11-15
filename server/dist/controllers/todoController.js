"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTodo = exports.deleteTodo = exports.updateTodo = exports.listTodos = exports.createTodo = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
const zodSchemas_1 = require("../utils/zodSchemas");
const logger_1 = require("../middleware/logger");
// Create Todo
const createTodo = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        zodSchemas_1.todoSchemas.create.parse(req.body);
        const todo = await Todo_1.default.create({ ...req.body, owner: req.user.id });
        res.status(201).json(todo);
    }
    catch (error) {
        (0, logger_1.logger)("error", error.message, error.stack, req);
        next(error);
    }
};
exports.createTodo = createTodo;
// List Todos
const listTodos = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const todos = await Todo_1.default.find({ owner: req.user.id });
        res.json(todos);
    }
    catch (error) {
        (0, logger_1.logger)("error", error.message, error.stack, req);
        next(error);
    }
};
exports.listTodos = listTodos;
// Update Todo
const updateTodo = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        zodSchemas_1.todoSchemas.update.parse(req.body);
        const todo = await Todo_1.default.findOneAndUpdate({ _id: req.params.id, owner: req.user.id }, req.body, { new: true });
        if (!todo)
            return res.status(404).json({ error: "Todo not found" });
        res.json(todo);
    }
    catch (error) {
        (0, logger_1.logger)("error", error.message, error.stack, req);
        next(error);
    }
};
exports.updateTodo = updateTodo;
// Delete Todo
const deleteTodo = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const todo = await Todo_1.default.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
        if (!todo)
            return res.status(404).json({ error: "Todo not found" });
        res.json({ message: "Todo deleted" });
    }
    catch (error) {
        (0, logger_1.logger)("error", error.message, error.stack, req);
        next(error);
    }
};
exports.deleteTodo = deleteTodo;
// Toggle Todo Complete
const toggleTodo = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const todo = await Todo_1.default.findOne({ _id: req.params.id, owner: req.user.id });
        if (!todo)
            return res.status(404).json({ error: "Todo not found" });
        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    }
    catch (error) {
        (0, logger_1.logger)("error", error.message, error.stack, req);
        next(error);
    }
};
exports.toggleTodo = toggleTodo;
