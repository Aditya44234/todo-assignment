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
    // Remove confirmPassword before sending (already handled inside API, so just pass all data)
    signupMutation.mutate(data, {
      onSuccess: (res) => {
        // Store user/token in Zustand
        setAuth({ user: res.user, token: res.token });
        // Redirect to /todos or other protected page
        navigate("/todos");
      },
      onError: (error: any) => {
        // you can handle/display errors here if needed
        console.log("Error signup :- ", error);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-8 bg-white shadow rounded space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <div>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          {...register("name")}
          className="input input-bordered w-full"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>
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
      <div>
        <label className="block mb-1">Confirm Password</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="input input-bordered w-full"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      {/* Error display */}
      {signupMutation.isError && (
        <p className="text-red-500 text-sm">
          {(signupMutation.error as Error).message || "Signup failed"}
        </p>
      )}
      {/* Success display (usually instant redirect) */}
      {/* <p className="text-green-600 text-sm">Signup successful!</p> */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={signupMutation.isPending}
      >
        {signupMutation.isPending ? "Signing up..." : "Sign Up"}
      </button>
      <div className="flex justify-center text-sm mt-4">
        <span>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
        </span>
      </div>
    </form>
  );
};

export default SignupForm;
