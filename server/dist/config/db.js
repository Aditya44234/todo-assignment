"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const connectDB = async () => {
    try {
        // console.log(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Mongo DB connected");
    }
    catch (error) {
        console.error("Can't connect to DB");
        process.exit(1);
    }
};
module.exports = connectDB;
