require("dotenv").config();
const express = require("express");
const connectDB=require("./config/db.js")
const app=express();
const PORT = process.env.PORT;
connectDB();

app.use(express.json());
const cors = require("cors");
app.use(cors());

const authRoute = require("./routes/authRoutes");
app.use("./api/auth", authRoute);

app.listen(PORT ,(req,res)=>{
  console.log(`server start on PORT ${PORT}`);
})