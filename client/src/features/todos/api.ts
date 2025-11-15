import type { Todo } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Helper: get JWT token from localStorage and build header
const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Normalize MongoDB _id format to frontend id
const normalizeTodo = (raw: any): Todo => ({
    id: raw._id || raw.id,
    title: raw.title,
    description: raw.description,
    completed: raw.completed,
});

// ---- Todos API ----

// Fetch all todos (GET /todos)
export const getTodos = async (): Promise<Todo[]> => {
    const res = await fetch(`${BASE_URL}/todos`, {
        headers: {
            ...getAuthHeaders()
        }
    });
    if (!res.ok) throw new Error("Failed to fetch todos");
    const data = await res.json();
    return Array.isArray(data) ? data.map(normalizeTodo) : [];
};

// Add new todo (POST /todos)
export const addTodo = async (
    payload: { title: string; description?: string }
): Promise<Todo> => {
    const res = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Failed to add todo");
    return normalizeTodo(await res.json());
};

// Update todo (PATCH /todos/:id)
export const updateTodo = async (todo: Todo): Promise<Todo> => {
    const { id, title, description, completed } = todo;
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
        },
        body: JSON.stringify({ title, description, completed }),
    });
    if (!res.ok) throw new Error("Failed to update todo");
    return normalizeTodo(await res.json());
};

// Delete todo (DELETE /todos/:id)
export const deleteTodo = async (id: string): Promise<void> => {
    const res = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE",
        headers: {
            ...getAuthHeaders(),
        }
    });
    if (!res.ok) throw new Error("Failed to delete todo");
};
