
const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config();


const connectDB = async () => {
    try {
        console.log(process.env.MONGODB_URI)
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Mongo DB connected")
    } catch (error) {
        console.error("Can't connect to DB");
        process.exit(1);
    }
}

module.exports = connectDB;