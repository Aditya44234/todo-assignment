import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api";
import type { Todo } from "./types";

// Fetch all todos
export const useTodos = () => {
    return useQuery<Todo[]>({
        queryKey: ["todos"],
        queryFn: getTodos,
    });
};

// Add a new todo
export const useAddTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: { title: string; description?: string }) =>
            addTodo(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });
};

// Update a todo
export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (todo: Todo) => updateTodo(todo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });
};

// Delete a todo
export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteTodo(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });
};
