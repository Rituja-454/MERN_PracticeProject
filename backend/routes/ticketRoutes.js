const express = require("express");
const router = express.Router();

const {createTicket , getTickets , getSingleTicket , updateStatus , addComment , deleteTicket}= 
require ("../controllers/ticketController");
const {protect} = require("./Middleware/authMiddleware");

router.post("/",protect,createTicket);
router.get("/",protect, getTickets);
router.get("/:id",protect,getSingleTicket);
router.put("/:id/status",protect ,updateStatus);
router.post("/:id/comment",protect,addComment);
router.delete("/:id" ,protect,deleteTicket);

module.exports= router;