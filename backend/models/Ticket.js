const mongoose =require("mongoose");
const {Schema} = require ("mongoose");

const ticketSchema= new Schema({
  title:{
     type:String,
     required :true
  },
  description:{
      type:String,
      required :true
  },
  category:{
      type:String,
      enum:["hadware","software","hr","finance","general"],
      required:true
  },
  status:{
    type:String ,
    enum:["pending","in progress","resolved","closed"],
    default:"pending"
  },
  createdBy:{
     type:mongoose.Schema.Types.ObjectId,
     ref:"User",
     required:true

  },

  comment:[{
    comment:{
      type:String,
      required:true
    },
    createdBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    createdAt:{
      type:Date,
      default:Date.now
    }
  }]
},
{
  timestamps : true
})

export default mongoose.model("Ticket", ticketSchema);