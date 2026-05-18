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

  const updateTicketStatus=async( id ,status)=>{
    try{
        const res = await API.put(`api/tickets/${id}/status`, {status});

        console.log(res.data);

        const editTicket = tickets.map((ticket)=>(
            ticket._id===id ? {...ticket , status} : ticket 
        ))
        setTickets(editTicket);
    }
    catch (error){
        console.log(error.response?.data || error.message);
    }
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

                {user.role ==="employee" && (
                     <p>Status - {ticket.status}</p>
                )}

                {user.role ==="admin" && (
                  <div>
                    <p>Created By : {ticket.createdBy?.name}</p>
                    <p>Email : {ticket.createdBy?.email}</p>

                    <label>
                        Update Status:
                    </label>

                    <select value={ticket.status} onChange = {(e)=>(
                      updateTicketStatus(ticket._id , e.target.value)
                    )}>
                      <option value="pending">
                          Pending
                      </option>
                       <option value="in progress">
                          In progress
                      </option>
                       <option value="resolved">
                          Resolved
                      </option>
                    </select>


                </div>

                  
                  
                )}
               

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
