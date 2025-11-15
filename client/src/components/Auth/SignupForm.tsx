import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "../../features/auth/zodSchemas";
import type { SignupFormValues } from "../../features/auth/zodSchemas";
import { useSignup } from "../../features/auth/hooks";
import { useAuthStore } from "../../features/auth/store";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);
  const signupMutation = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    signupMutation.mutate(data, {
      onSuccess: (res) => {
        setAuth({  token: res.token });
        navigate("/login");
      },
      onError: (error: any) => {
        console.log("Error signup :- ", error);
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-8 bg-white/90 shadow-xl rounded-xl space-y-8 border border-slate-200"
      >
        <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-4 tracking-tight">
          Create Your Account
        </h2>
        {/* Name Field */}
        <div>
          <label className="block mb-1 font-medium text-slate-600">Name</label>
          <input
            type="text"
            autoComplete="name"
            {...register("name")}
            className={`input input-bordered w-full ${
              errors.name ? "border-red-400" : ""
            }`}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>
        {/* Email Field */}
        <div>
          <label className="block mb-1 font-medium text-slate-600">Email</label>
          <input
            type="email"
            autoComplete="email"
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
            autoComplete="new-password"
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
        {/* Confirm Password */}
        <div>
          <label className="block mb-1 font-medium text-slate-600">
            Confirm Password
          </label>
          <input
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            className={`input input-bordered w-full ${
              errors.confirmPassword ? "border-red-400" : ""
            }`}
            placeholder="Re-type Password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {/* Backend Error */}
        {signupMutation.isError && (
          <div className="bg-red-50 border border-red-200 rounded p-3 text-red-700 text-sm">
            {(signupMutation.error as Error).message || "Signup failed"}
          </div>
        )}
        {/* Signup Button */}
        <button
          type="submit"
          className="btn btn-primary w-full py-2 text-lg font-semibold shadow-md bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 transition-all"
          disabled={signupMutation.isPending}
        >
          {signupMutation.isPending ? "Signing up..." : "Sign Up"}
        </button>
        {/* Login CTA */}
        <div className="flex justify-center text-sm mt-4">
          <span>
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Log In
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
