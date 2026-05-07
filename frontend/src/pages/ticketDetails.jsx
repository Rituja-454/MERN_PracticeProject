import {useParams , useNavigate} from "react-router-dom";
import{useEffect , useState} from "react";
import API from "../services/api";

function TicketDetails(){
  const navigate= useNavigate();
  const {id} = useParams();
  
  const[ticket , setTicket] = useState(null);

  useEffect (()=>{
    const singleTicket = async()=>{
      try{
        const res = await API.get(`/api/tickets/${id}`);
        console.log(res.data);
        setTicket(res.data.ticket);
      }
      catch(error){
          console.log(error);
      }
    }
    singleTicket();
  },[id])

  if(!ticket){
   return <h2>Loading...</h2>;
  }

  return (
   <div>

      <h1>Ticket Details</h1>

      <div>

        <h2>{ticket.title}</h2>

        <p>
          <b>Description:</b> {ticket.description}
        </p>

        <p>
          <b>Category:</b> {ticket.category}
        </p>

        <p>
          <b>Status:</b> {ticket.status}
        </p>

        <p>
          <b>Created By:</b>{" "}
          {ticket.createdBy?.name}
        </p>

        <p>
          <b>Email:</b>{" "}
          {ticket.createdBy?.email}
        </p>

        <p>
          <b>Created At:</b>{" "}
          {new Date(ticket.createdAt).toLocaleString()}
        </p>

      </div>

      <br />

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

    </div>
  )

}

export default TicketDetails;