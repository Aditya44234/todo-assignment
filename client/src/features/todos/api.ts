import type { Todo } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getTodos = async (): Promise<Todo[]> => {
    const res = await fetch(`${BASE_URL}/todos`);
    if (!res.ok) throw new Error("Failed to fetch todos");
    return res.json();
};

export const addTodo = async (text: string): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("Failed to add todo");
    return res.json();
};

export const updateTodo = async (todo: Todo): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    return res.json();
};

export const deleteTodo = async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete todo");
};
