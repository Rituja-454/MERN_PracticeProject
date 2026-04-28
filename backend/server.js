require("dotenv").config();
const express = require("express");
const connectDB=require("./config/db.js")
const app=express();
const PORT = process.env.PORT;
connectDB();

app.listen(PORT ,(req,res)=>{
  console.log(`server start on PORT ${PORT}`);
})