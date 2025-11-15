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

  // Reactively update form when edit target changes!
  useEffect(() => {
    reset({
      title: initialTitle,
      description: initialDescription,
    });
  }, [initialTitle, initialDescription, reset]);

  // On save, show modal confirmation
  const onFormSubmit = (data: TodoFormValues) => {
    onSubmit(data);
    setShowModal(true);
    reset();
  };

  // Modal component
  const ConfirmationModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-xs text-center">
        <h3 className="text-lg font-semibold mb-2">Success</h3>
        <p className="text-gray-600 mb-4">Todo has been saved!</p>
        <button
          onClick={() => setShowModal(false)}
          className="btn btn-primary px-6"
        >
          OK
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Modal Overlay */}
      {showModal && <ConfirmationModal />}
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-2 mb-4 relative"
      >
        <input
          {...register("title")}
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
        <textarea
          {...register("description")}
          placeholder="Description (optional)"
          className="input input-bordered w-full"
          disabled={isLoading}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </>
  );
};

export default TodoForm;
