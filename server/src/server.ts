

import app from "./app";
const morgan=require('morgan')
const connectDB=require('./config/db')
const PORT = process.env.PORT || 5000;
app.use(morgan("dev"))

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})