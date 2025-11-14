  


const express=require("express")

const morgan=require("morgan")




const PORT=3000 
const app=express();

app.use(morgan("dev"))
app.get("/", (req,res)=>{
    res.json({message:"Server is running ....."})
})


app.listen(PORT,(res,res)=>{
    console.log(`Server started at ${PORT} `)
})