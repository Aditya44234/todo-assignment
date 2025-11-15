import { Router } from "express";
import {
  createTodo,
  listTodos,
  updateTodo,
  deleteTodo,
  toggleTodo
} from "../controllers/todoController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

// All todo routes should be protected!
router.use(authMiddleware);

router.post("/", createTodo);
router.get("/", listTodos);
router.patch("/:id", updateTodo);
router.delete("/:id", deleteTodo);

// Toggle completion (PATCH recommended)
router.patch("/:id/toggle", toggleTodo);

export default router;
