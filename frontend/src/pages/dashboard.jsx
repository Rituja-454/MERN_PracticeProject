import React,{useState ,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import API from "../services/api";


function Dashboard(){
  const [tickets , setTickets] =useState([]);

   useEffect(()=>{
    const dataFetching =async()=>{
      try{
          const res = await API.get("api/tickets");
          console.log(res.data);
          setTickets(res.data.tickets);
      }
      catch(error){
          console.log(error.response?.data || error.message);
      }
    };
      
    dataFetching();
  },[]);

  const navigate =useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));   //string to object conversion

  if(!user){
    return navigate("/login");
  }

 

  const handleLogout=()=>{
      localStorage.clear();
      navigate("/login");
  }

  return(
    <div>

      <h1>Dashboard</h1>
      <p>
        Welcome , <b>{user.name}</b> ({user.role});
      </p>
        {
          user.role ==="employee" && (
            <button onClick={() => navigate("/createTicket")}  >
              Create Ticket
            </button>
          )
        }
      
      {
        user.role==="admin" && (
           <p>admin can manage all tickets , cannot create tickets</p>
        )
      }

      <br/><br/>
      <div>
        <h1>All Tickets</h1>
        {
          tickets.length===0? (<p>No tickets Found</p>) : 
          (tickets.map((ticket)=>(
              <div key={ticket._id}>
                <h2>Title - {ticket.title}</h2>
                <p>Description - {ticket.description}</p>
                <p>Category - {ticket.category}</p>
                <p>Status - {ticket.status}</p>

                <button onClick={()=>navigate(`/ticketDetails/${ticket._id}`)}>View Details </button>
            </div>

           
            )

           
         ))
        }
      </div>
       

      <div>
          <button onClick={handleLogout}>
              Logout
          </button>
      </div>
    
    </div>
  )
}

export default Dashboard;
