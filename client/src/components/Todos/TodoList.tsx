import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import type { Todo } from "./TodoItem";
import {
  useTodos,
  useAddTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "../../features/todos/hooks";
import { useAuthStore } from "../../features/auth/store";  

const TodoList: React.FC = () => {
  const { data: todos = [], isLoading, isError } = useTodos();
  const addTodoMutation = useAddTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();
  const token = useAuthStore((s) => s.token);
  const navigate = useNavigate();

  // Redirect to login if NOT authenticated
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // ...all handlers as before...

  const handleSubmit = ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => {
    if (editingTodo) {
      updateTodoMutation.mutate({
        ...editingTodo,
        title,
        description,
      });
      setEditingTodo(null);
    } else {
      addTodoMutation.mutate({ title, description });
    }
  };

  const handleMarkDone = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      updateTodoMutation.mutate({
        ...todo,
        completed: !todo.completed,
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate(id);
    if (editingTodo?.id === id) setEditingTodo(null);
  };

  const handleEdit = (todo: Todo) => setEditingTodo(todo);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-indigo-50 via-blue-50 to-pink-50 py-8 px-2">
      <div className="w-full max-w-2xl p-6 bg-white/95 rounded-2xl border border-slate-200 shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700 tracking-tight">
          📝 Your Todos
        </h2>
        {/* TodoForm handles add/edit */}
        <div className="mb-4">
          <TodoForm
            initialTitle={editingTodo?.title ?? ""}
            initialDescription={editingTodo?.description ?? ""}
            onSubmit={handleSubmit}
            isLoading={
              addTodoMutation.isPending || updateTodoMutation.isPending
            }
          />
        </div>

        {/* Error state */}
        {isError && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700 text-center mb-4 text-sm">
            Failed to load todos.
          </div>
        )}

        {/* Loading */}
        {isLoading ? (
          <p className="text-center text-slate-400 my-6 text-lg">Loading...</p>
        ) : todos.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-lg font-medium">
            You have no todos yet!
            <div className="text-xs font-normal mt-2 text-slate-400">
              Add your first todo above.
            </div>
          </div>
        ) : (
          <div>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onMarkDone={handleMarkDone}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
