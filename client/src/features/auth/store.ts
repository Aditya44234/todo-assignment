import { create } from "zustand";
import type { User } from "./types";

type AuthState = {
    user: User | null;
    token: string | null;
    setAuth: (payload: { token: string }) => void;
    hydrateAuth: () => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    setAuth: ({ token }) => {
        set({ token });
        localStorage.setItem("token", token);
    },
    hydrateAuth: () => {
        const token = localStorage.getItem("token");
        // Optionally, fetch user profile with token here if needed
        set({ token, user: null });
    },
    logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("token");
    },
}));
