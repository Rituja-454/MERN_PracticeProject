const User = require ("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function JWTtokenGeneration(user){
  return jwt.sign(
     {
      id:user._id,
      role:user.role
     },
     process.env.JWT_SECRET,
     {
      expiresIn:"1d"
     }

   )
}

async function registerUser (req,res){
  const {name,email,password}= req.body;
  try{
      if(!name || !email || !password){
    return res.status(400).json({message:"All fields must be required"})
   // console.log ("all fields must be required");
 
  }
  
  const existingUser = await User.findOne({email});
  if(existingUser){
    return res.status(400).json({message:"User already exist"})
    console.log("user already exist");
    alert("registration failed")
  }

 const salt =await bcrypt.genSalt(10);
 const hashedPW = await bcrypt.hash(password,salt);

  const user = await User.create({
    name,
    email,
    password:hashedPW ,
    role:"employee"
  });

  res.status(201).json(
    {message:"user registered successfully" ,
      user:{
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
      },
      token:JWTtokenGeneration(user)
    });

  }
  catch(error){
    console.log(error);
    res.status(500).json({message:"server error"})
  }
}

const loginUser = async(req,res) =>{
  try{
      const user=req.body;
      if(!user.email || !user.password){
        return res.status(400).json({message:"must be filled required information"})
      }

      const users =await User.findOne({email:user.email});   // complete user data will load in "user"
      if(!users){
        return res.status(404).json({message:"user not found"});
      }

      const pwMatch =await bcrypt.compare(user.password , users.password)
      if(!pwMatch){
        return res.status(400).json({message:"invalid password"})
      }

      res.json({message:"user login successfully",
        user:{
          id:users._id,
          name:users.name,
          email:users.email,
          role:users.role
        },
        token:JWTtokenGeneration(users)
      }
      )
  }
  catch(error){
     console.log(error);
     res.status(500).json({message:"server error"});
  }
}

module.exports ={
  registerUser ,
  loginUser
}