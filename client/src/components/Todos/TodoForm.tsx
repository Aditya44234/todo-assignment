import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const todoSchema = z.object({
  text: z.string().min(1, "Todo cannot be empty"),
});

type TodoFormValues = z.infer<typeof todoSchema>;

type Props = {
  initialText?: string;
  onSubmit: (data: TodoFormValues) => void;
  isLoading?: boolean;
};

const TodoForm: React.FC<Props> = ({
  initialText = "",
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: { text: initialText },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset(); // Clear after add/edit
      })}
      className="flex gap-2 mb-4"
    >
      <input
        {...register("text")}
        type="text"
        placeholder="Enter todo"
        className="input input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save"}
      </button>
      {errors.text && (
        <p className="text-red-500 text-sm">{errors.text.message}</p>
      )}
    </form>
  );
};

export default TodoForm;
