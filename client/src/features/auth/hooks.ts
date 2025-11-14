import { useMutation } from "@tanstack/react-query";
import { signup, login, forgotPassword, resetPassword } from "./api";
import type {
    SignupFormValues,
    LoginFormValues,
    ForgotPasswordFormValues,
    ResetPasswordFormValues,
} from "./zodSchemas";

// Signup hook
export const useSignup = () =>
    useMutation({
        mutationFn: (data: SignupFormValues) => signup(data),
    });

// Login hook
export const useLogin = () =>
    useMutation({
        mutationFn: (data: LoginFormValues) => login(data),
    });

// Forgot password hook
export const useForgotPassword = () =>
    useMutation({
        mutationFn: (data: ForgotPasswordFormValues) => forgotPassword(data),
    });

// Reset password hook
export const useResetPassword = () =>
    useMutation({
        mutationFn: (args: { token: string; data: ResetPasswordFormValues }) =>
            resetPassword(args.token, args.data),
    });
