import { Router } from 'express';
import { createTodo, listTodos, updateTodo, deleteTodo, toggleTodo } from '../controllers/todoController'
import { authMiddleware } from '../middleware/authMiddleware';
const router = Router();
router.use(authMiddleware);
router.post('/', createTodo);
router.get('/', listTodos)


export default router;
