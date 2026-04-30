const express = require("express");
const router = express.router();

const {registerUser , loginUser}=require("./controllers/authController");
const {protect} = require("./Middleware/authMiddleware");

router.post("/register",registerUser);
router.post("/login",loginUser);

module.exports={router};