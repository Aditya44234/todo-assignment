import { create } from "zustand";

// Match backend/normalized frontend
export type Todo = {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
};

type TodoState = {
    todos: Todo[];
    setTodos: (todos: Todo[]) => void;
    addTodo: (todo: Todo) => void;
    updateTodo: (todo: Todo) => void;
    deleteTodo: (id: string) => void;
    markCompleted: (id: string, completed: boolean) => void;
};

export const useTodoStore = create<TodoState>((set) => ({
    todos: [],
    setTodos: (todos) => set({ todos }),
    addTodo: (todo) =>
        set((state) => ({ todos: [...state.todos, todo] })),
    updateTodo: (todo) =>
        set((state) => ({
            todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
        })),
    deleteTodo: (id) =>
        set((state) => ({
            todos: state.todos.filter((t) => t.id !== id),
        })),
    markCompleted: (id, completed) =>
        set((state) => ({
            todos: state.todos.map((t) =>
                t.id === id ? { ...t, completed } : t
            ),
        })),
}));
