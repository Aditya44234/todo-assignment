import { z } from "zod";

// Signup form schema
export const signupSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 chars"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
export type SignupFormValues = z.infer<typeof signupSchema>;

// Login form schema
export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password is required"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;

// Forgot password schema
export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email"),
});
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// Reset password schema
export const resetPasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 chars"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
