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
  timestamps : true    //will give 1)createdAt  2)upupdatedAt
 }
)

const User = mongoose.model("User",userSchema);
module.exports = User;

//export default (User)
