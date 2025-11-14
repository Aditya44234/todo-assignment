import React from "react";
import TodoItem from "./TodoItem";
import type { Todo } from "./TodoItem";

type Props = {
  todos: Todo[];
  onMarkDone: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
};

const TodoList: React.FC<Props> = ({ todos, onMarkDone, onDelete, onEdit }) => (
  <div>
    {todos.length === 0 ? (
      <p className="text-gray-500">No todos found.</p>
    ) : (
      todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onMarkDone={onMarkDone}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))
    )}
  </div>
);

export default TodoList;
