import React, { useState } from "react";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import type { Todo } from "./TodoItem";
import {
  useTodos,
  useAddTodo,
  useUpdateTodo,
  useDeleteTodo,
} from "../../features/todos/hooks";

const TodoList: React.FC = () => {
  const { data: todos = [], isLoading, isError } = useTodos();
  const addTodoMutation = useAddTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  // For editing a todo
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  // Add new or edit
  const handleSubmit = ({ text }: { text: string }) => {
    if (editingTodo) {
      updateTodoMutation.mutate({ ...editingTodo, text });
      setEditingTodo(null);
    } else {
      addTodoMutation.mutate(text);
    }
  };

  // Mark as done/undone
  const handleMarkDone = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      updateTodoMutation.mutate({ ...todo, completed: !todo.completed });
    }
  };

  // Delete
  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate(id);
    if (editingTodo?.id === id) setEditingTodo(null);
  };

  // Edit
  const handleEdit = (todo: Todo) => setEditingTodo(todo);

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Todos</h2>
      {/* TodoForm handles add/edit */}
      <TodoForm
        initialText={editingTodo?.text ?? ""}
        onSubmit={handleSubmit}
        isLoading={addTodoMutation.isPending || updateTodoMutation.isPending}
      />

      {/* Error state */}
      {isError && <p className="text-red-500">Failed to load todos.</p>}

      {/* Loading */}
      {isLoading ? (
        <p>Loading...</p>
      ) : todos.length === 0 ? (
        <p className="text-gray-500">No todos found.</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onMarkDone={handleMarkDone}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))
      )}
    </div>
  );
};

export default TodoList;
