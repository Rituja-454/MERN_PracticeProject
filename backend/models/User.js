const mongoose = require ("mongoose");
const Schema = mongoose.Schema ;
//const {Schema} = require ("mongoose");            /destucturing/

const userSchema = new Schema(
  //schema that will store in databse
  {
  name:{
     type:String,
     required:true
  },
  email:{
      type:String ,
      required:true
  },
  password:{
      type:String,
      required :true
  },
  role:{
      type:String,
      enum:["admin" ,"employee"],
      default:"employee"
  },
 },
 //options not fields
 {
  timestamps : true
 }
)

const User = mongoose.model("User",userSchema);
module.exports = User;

//export default (User)
