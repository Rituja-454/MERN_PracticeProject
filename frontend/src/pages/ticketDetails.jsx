import {useParams , useNavigate} from "react-router-dom";
import{useEffect , useState} from "react";
import API from "../services/api";

function TicketDetails(){
  const navigate= useNavigate();
  const {id} = useParams();
  const[comment ,setComment]= useState("");
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

  const addComment=async()=>{
    try{
         const res = await API.post(`api/tickets/${id}/comment`,{comment:comment});
        
          console.log(res.data.ticket.comments);
          setTicket(res.data.ticket);
          setComment("");

    }
   catch(error){
    console.log(error.response?.data || error.message);

   }


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

      <textarea value={comment}
                onChange={(e)=>setComment(e.target.value)}
                placeholder="add comment"
      />

      <button onClick={addComment}>add Comment</button>
      <br/>

      <br />
<br />

    <h2>Comments</h2>

    {
      ticket.comments?.length === 0 ? (

          <p>No comments added yet</p>

      ) : (

          ticket.comments.map((item,index)=>(

            <div key={index}>

                <p>

                  <b>
                      {item.createdBy?.name}
                  </b>

                  {" : "}

                  {item.comment}

                </p>

            </div>
          ))
      )
    }

<br/>

      <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>

    </div>
  )

}

export default TicketDetails;