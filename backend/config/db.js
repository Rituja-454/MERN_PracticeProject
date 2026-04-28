const mongoose=require("mongoose");

//const url = require(process.env.MONGO_URL);
//const PORT =require(process.env.PORT)

const connectDB = async()=>{
  try{
      await mongoose.connect(process.env.MONGO_URL);
      console.log("MongoDB connected");
  }
  catch(error){
     console.log("MongoDB connection error",error);
     process.exit(1);
  }
  
}
module.exports= connectDB;
