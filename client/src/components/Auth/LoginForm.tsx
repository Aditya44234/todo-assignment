import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../features/auth/zodSchemas";
import type { LoginFormValues } from "../../features/auth/zodSchemas";
import { useLogin } from "../../features/auth/hooks";
import { useAuthStore } from "../../features/auth/store";

// Ensure this is ONLY used inside a function component and with compatible React versions
const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  // Zustand store usage is correct here
  const setAuth = useAuthStore((s) => s.setAuth);

  // React Query mutation hook (correct usage)
  const loginMutation = useLogin();

  // RHF form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Submit: call backend, set auth state, navigate
  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        setAuth({ user: res.user, token: res.token });
      },
      // Handle errors globally if needed
    });
    navigate("/todos");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-8 bg-white shadow rounded space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {/* Email Field */}
      <div>
        <label className="block mb-1">Email</label>
        <input
          type="email"
          {...register("email")}
          className="input input-bordered w-full"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      {/* Password Field */}
      <div>
        <label className="block mb-1">Password</label>
        <input
          type="password"
          {...register("password")}
          className="input input-bordered w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      {/* Forgot Password Link */}
      <div className="flex justify-end text-sm mb-4">
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
      {/* Backend Error */}
      {loginMutation.isError && (
        <p className="text-red-500 text-sm">
          {(loginMutation.error as Error)?.message || "Login failed"}
        </p>
      )}
      {/* Submit Button */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>
      {/* Sign Up Link */}
      <div className="flex justify-center text-sm mt-4">
        <span>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
