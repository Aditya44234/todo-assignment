import type {
    SignupFormValues,
    LoginFormValues,
    ForgotPasswordFormValues,
    ResetPasswordFormValues
} from "./zodSchemas";
import type { AuthResponse } from "./types";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/";

// Signup
export const signup = async (data: SignupFormValues): Promise<AuthResponse> => {
    const { confirmPassword, ...payload } = data;
    const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    console.log("signup success :-",res)
    return res.json();
};

// Login
export const login = async (data: LoginFormValues): Promise<AuthResponse> => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    // console.log("Login success :-",res.json())
    return res.json();
}

// Forgot Password
export const forgotPassword = async (data: ForgotPasswordFormValues): Promise<{ message: string }> => {
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};

// Reset Password
export const resetPassword = async (token: string, data: ResetPasswordFormValues): Promise<{ message: string }> => {
    const { confirmPassword, ...payload } = data;
    const res = await fetch(`${BASE_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};
