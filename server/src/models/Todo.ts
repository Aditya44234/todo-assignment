import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITodo extends Document {
    title: string;
    description?: string;
    completed: boolean;
    owner: Types.ObjectId;
}

const todoSchema = new Schema<ITodo>({

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    timestamps: true
})
const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;