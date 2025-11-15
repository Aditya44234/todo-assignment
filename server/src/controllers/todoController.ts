import { Request, Response, NextFunction } from "express";
import Todo from "../models/Todo";
import { todoSchemas } from "../utils/zodSchemas";
import { logger } from "../middleware/logger";



// Create Todo
export const createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        todoSchemas.create.parse(req.body);
        const todo = await Todo.create({ ...req.body, owner: req.user.id });
        res.status(201).json(todo);
    } catch (error: any) {
        logger("error", error.message, error.stack, req);
        next(error);
    }
};

// List Todos
export const listTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const todos = await Todo.find({ owner: req.user.id });
        res.json(todos);
    } catch (error: any) {
        logger("error", error.message, error.stack, req);
        next(error);
    }
};

// Update Todo
export const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        todoSchemas.update.parse(req.body);
        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.id },
            req.body,
            { new: true }
        );
        if (!todo) return res.status(404).json({ error: "Todo not found" });
        res.json(todo);
    } catch (error: any) {
        logger("error", error.message, error.stack, req);
        next(error);
    }
};

// Delete Todo
export const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
        if (!todo) return res.status(404).json({ error: "Todo not found" });
        res.json({ message: "Todo deleted" });
    } catch (error: any) {
        logger("error", error.message, error.stack, req);
        next(error);
    }
};

// Toggle Todo Complete
export const toggleTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const todo = await Todo.findOne({ _id: req.params.id, owner: req.user.id });
        if (!todo) return res.status(404).json({ error: "Todo not found" });

        todo.completed = !todo.completed;
        await todo.save();

        res.json(todo);
    } catch (error: any) {
        logger("error", error.message, error.stack, req);
        next(error);
    }
};
