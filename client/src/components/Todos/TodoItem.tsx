import React from "react";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

type Props = {
  todo: Todo;
  onMarkDone: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
};

const TodoItem: React.FC<Props> = ({ todo, onMarkDone, onDelete, onEdit }) => (
  <div className="flex items-center gap-4 p-4 bg-white/90 shadow rounded-xl mb-4 border border-slate-100 transition hover:shadow-lg">
    {/* Custom checkbox with animation */}
    <button
      className={`w-6 h-6 flex items-center justify-center rounded border transition duration-150 ${
        todo.completed ? "bg-indigo-500 border-indigo-600" : "border-slate-300"
      }`}
      aria-label={todo.completed ? "Mark as not done" : "Mark as done"}
      title={todo.completed ? "Mark as not done" : "Mark as done"}
      onClick={() => onMarkDone(todo.id)}
      style={{ outline: "none" }}
    >
      {todo.completed ? (
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : null}
    </button>

    {/* Title/Description */}
    <div className="flex-1 min-w-0">
      <div
        className={`text-lg font-semibold truncate ${
          todo.completed ? "line-through text-slate-400" : "text-slate-700"
        }`}
      >
        {todo.title}
      </div>
      {todo.description && (
        <div className="text-xs text-slate-500 truncate">
          {todo.description}
        </div>
      )}
    </div>
    {/* Actions */}
    <button
      className="btn btn-xs btn-outline btn-info ml-2"
      onClick={() => onEdit(todo)}
      aria-label="Edit todo"
      title="Edit"
    >
      Edit
    </button>
    <button
      className="btn btn-xs btn-outline btn-error ml-2"
      onClick={() => onDelete(todo.id)}
      aria-label="Delete todo"
      title="Delete"
    >
      Delete
    </button>
  </div>
);

export default TodoItem;
