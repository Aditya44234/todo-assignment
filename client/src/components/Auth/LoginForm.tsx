import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../features/auth/zodSchemas";
import type { LoginFormValues } from "../../features/auth/zodSchemas";
import { useLogin } from "../../features/auth/hooks";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => navigate("/todos"),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white/90 shadow-xl rounded-xl space-y-8 border border-slate-200"
      >
        <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-4 tracking-tight">
          Welcome Back
        </h2>

        {/* Email Field */}
        <div>
          <label className="block mb-1 font-medium text-slate-600">Email</label>
          <input
            type="email"
            autoComplete="username"
            {...register("email")}
            className={`input input-bordered w-full ${
              errors.email ? "border-red-400" : ""
            }`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block mb-1 font-medium text-slate-600">
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            {...register("password")}
            className={`input input-bordered w-full ${
              errors.password ? "border-red-400" : ""
            }`}
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="flex justify-end text-xs">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </Link>
        </div>

        {/* Backend Error */}
        {loginMutation.isError && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm">
            {(loginMutation.error as Error)?.message || "Login failed"}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full py-2 text-lg font-semibold shadow-md bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </button>

        {/* Sign Up CTA */}
        <div className="flex justify-center text-sm mt-4">
          <span>
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
