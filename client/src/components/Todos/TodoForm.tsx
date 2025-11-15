import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema: title required, description optional
const todoSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().optional(),
});

type TodoFormValues = z.infer<typeof todoSchema>;

type Props = {
  initialTitle?: string;
  initialDescription?: string;
  onSubmit: (data: TodoFormValues) => void;
  isLoading?: boolean;
};

const TodoForm: React.FC<Props> = ({
  initialTitle = "",
  initialDescription = "",
  onSubmit,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: initialTitle,
      description: initialDescription,
    },
  });

  useEffect(() => {
    reset({
      title: initialTitle,
      description: initialDescription,
    });
  }, [initialTitle, initialDescription, reset]);

  const onFormSubmit = (data: TodoFormValues) => {
    onSubmit(data);
    setShowModal(true);
    reset();
  };

  const ConfirmationModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xs text-center border border-indigo-500">
        <h3 className="text-lg font-semibold mb-2 text-indigo-700">Success</h3>
        <p className="text-gray-600 mb-4">Todo has been saved!</p>
        <button
          onClick={() => setShowModal(false)}
          className="btn w-full border-2 border-indigo-500 text-indigo-700 font-bold py-2 rounded-xl shadow hover:bg-indigo-50 transition"
        >
          OK
        </button>
      </div>
    </div>
  );

  return (
    <>
      {showModal && <ConfirmationModal />}
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-3 mb-4 p-4 rounded-xl border border-slate-200 bg-white shadow"
      >
        <label className="font-medium text-indigo-800 mb-1">
          Title
          <input
            {...register("title")}
            type="text"
            placeholder="Title"
            className={`block mt-1 w-full px-4 py-2 rounded-lg border-2 ${
              errors.title
                ? "border-red-400 focus:border-red-500"
                : "border-indigo-300 focus:border-indigo-500"
            } outline-none transition`}
            disabled={isLoading}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </label>
        <label className="font-medium text-indigo-800 mb-1">
          Description
          <textarea
            {...register("description")}
            placeholder="Description (optional)"
            className={`block mt-1 w-full px-4 py-2 rounded-lg border-2 border-indigo-200 focus:border-indigo-400 outline-none transition`}
            disabled={isLoading}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
          )}
        </label>
        <button
          type="submit"
          className="w-full py-2 mt-1 font-semibold text-lg rounded-xl border-2 border-indigo-600 text-indigo-600 bg-white hover:bg-indigo-50 active:bg-indigo-100 transition shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:bg-slate-100 disabled:opacity-70"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </>
  );
};

export default TodoForm;
