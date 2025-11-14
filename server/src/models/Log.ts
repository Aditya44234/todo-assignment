
import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILog extends Document {
    level: string;
    message: string;
    stack?: string;
    timestamp: Date;
    meta?: any;
}

const logSchema = new Schema({
    level: {
        type: String,
        require: true
    },

    message: {
        type: String,
        required: true
    },

    stack: String,
    meta: Schema.Types.Mixed,

    timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model<ILog>('Log', logSchema);

export default Log;