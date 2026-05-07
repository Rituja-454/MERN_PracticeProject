import React from "react";
import {useNavigate} from "react-router-dom";


function Dashboard(){
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
      <div>
          <button onClick={handleLogout}>
              Logout
          </button>
      </div>
    
    </div>
  )
}

export default Dashboard;
