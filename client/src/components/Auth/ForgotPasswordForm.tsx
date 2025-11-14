import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const forgotSchema = z.object({
  email: z.string().email("Invalid email"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

const ForgotPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = (data: ForgotFormValues) => {
    // TODO: Connect to actual forgot password API later
    console.log("Forgot password request:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-8 bg-white shadow rounded space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
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
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
