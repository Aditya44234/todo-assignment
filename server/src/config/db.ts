


import mongoose from "mongoose";

import dotenv from 'dotenv'

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Mongo DB connected")

    } catch (error) {
        console.error(" Can't connect to DB");
        process.exit(1);
    }
}

export default connectDB;