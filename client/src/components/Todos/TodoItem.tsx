import React from "react";
import { useTodoStore } from "../../features/todos/store";

useTodoStore
export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

type Props = {
  todo: Todo;
  onMarkDone: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
};

const TodoItem: React.FC<Props> = ({ todo, onMarkDone, onDelete, onEdit }) => (
  <div className="flex items-center gap-2 p-2 bg-white border rounded mb-2">
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => onMarkDone(todo.id)}
    />
    <span className={todo.completed ? "line-through text-gray-500" : ""}>
      {todo.text}
    </span>
    <button className="btn btn-xs ml-auto" onClick={() => onEdit(todo)}>
      Edit
    </button>
    <button className="btn btn-xs btn-error" onClick={() => onDelete(todo.id)}>
      Delete
    </button>
  </div>
);

export default TodoItem;
