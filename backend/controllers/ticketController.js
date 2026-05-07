const Ticket = require("../models/Ticket.js");

const createTicket =async (req,res)=>{
   try{
      const {title , description , category} = req.body;

      if(!title || !description || !category){
        res.json({message:"all feilds must be required"});
      }

      const user = req.user;
      const ticket =await Ticket.create({
        title,
        description ,
        category :category.toLowerCase(),
        status:"pending",
        createdBy:user.id
      });

      res.json({message:"ticket created successfully " , ticket })


        // ticket:{
        //   id:ticket._id,
        //   title:ticket.title,
        //   description :ticket.description ,
        //   category :ticket.category,
        //   status:ticket.status
        // }
      
   }
   catch(error){
     console.log(error);
     res.json({message:"serevr error"});
   }
}

const getTickets =async(req,res)=>{
    try{
       let tickets;
       if(req.user.role ==="admin"){
          tickets = await Ticket.find().populate("createdBy " , "name" ,"email").sort({createdAt:-1});
       }
       else{
        tickets = await Ticket.find({createdBy:req.user.id}).populate("createdBy" ,"name email").sort({createdAt:-1});
       }
       res.json({tickets});

    }  
    catch(error){
       console.log(error);
        res.json({message:"server error"})
    }
};

const getSingleTicket = async(req,res)=>{
   try{
      const ticket =await Ticket.findById(req.params.id).populate("createdBy","name email")

      if(!ticket){
        return res.json({message : "ticket not found"})
      }

      if(req.user.role!=="admin" && ticket.createdBy._id.toString() !== req.user.id.toString()){
        return res.json({message:"access denied , employee can access only their tickets" });
      }

      res.json({ticket});
   }
   catch(error){
     console.log(error);
     res.json({message:"server error"});
   }
}

const updateStatus = async(req,res)=>{
     try{
         if(req.user.role!=="admin"){
          return res.json({message:"only admin can update status"})
         }
         const {status} = req.body;

         const ticket = await Ticket.findById(req.params.id);

         if(!ticket){
            res.json({message:"ticket not found"});
         }

        ticket.status = status || ticket.status   //ignores falsy values

        //  if(ticket.status !== status){
        //      ticket.status = status ;
        //  }

         const updatedTicket = await ticket.save();

         res.json({message:"ticket updated successfully" , ticket:updatedTicket})
         
     }
     catch(error){
        console.log(error);
        res.json({message:"server error"});
     }
}

const addComment = async(req,res)=>{
      try{
          const ticket = await Ticket.findById(req.params.id);

          if(!ticket){
            res.json({message:"ticket not found"});
          }

          ticket.comments.push({
             comment :req.body.comment ,
             createdBy : req.user._id
          })

          const commentAdded = await ticket.save();

          res.json({message:"comment added successfully" ,ticket:commentAdded})


      }
      catch (error){
          console.log(error);
          res.json({message:"server error"});
      }
}

const deleteTicket = async (req,res)=>{
   try{
        const ticket =await Ticket.findById(req.params.id);

        if(!ticket){
          return res.json({message:"ticket not found"});
        }
        if(req.user.role !=="admin" && ticket.createdBy._id.toString()!==res.user.id.toString()){
          return res.json({message:"access denied , employee can delete on their own tickets"})
        }
        await ticket.remove();
        res.json({message:"ticket deleted successfully"})
   }
   catch(error){
        console.log(error);
        res.json({message:"server error"});
   }
}

module.exports ={createTicket , getTickets , getSingleTicket , updateStatus , addComment , deleteTicket}