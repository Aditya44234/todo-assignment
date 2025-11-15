"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoController_1 = require("../controllers/todoController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// All todo routes should be protected!
router.use(authMiddleware_1.authMiddleware);
router.post("/", todoController_1.createTodo);
router.get("/", todoController_1.listTodos);
router.patch("/:id", todoController_1.updateTodo);
router.delete("/:id", todoController_1.deleteTodo);
// Toggle completion (PATCH recommended)
router.patch("/:id/toggle", todoController_1.toggleTodo);
exports.default = router;
