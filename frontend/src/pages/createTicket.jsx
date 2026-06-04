import {useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../services/api";

function CreateTicket(){
  const navigate =useNavigate();
  const user= JSON.parse(localStorage.getItem("user"));

 const [ticket , setTicket] =useState({
    title:"",
    description:"",
    category:""
  })

   if(!user){
    return navigate("/login");
  }

  const handleChange =(e)=>{
      setTicket({...ticket , [e.target.name]:e.target.value});
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
        const ticketData= await API.post("/api/tickets/" , ticket);
       
        alert("ticket created successfully");
           console.log(ticketData.data);
        navigate("/dashboard");
      //  localStorage.setItem("ticket" , JSON.stringify(res.data.ticket));
    }
    catch(error){
     console.log(error);
    }
  }
  return (
    <div>
      <h1>Create Ticket</h1>

      <form onSubmit={handleSubmit}>
          <div>
             <label htmlFor="ticketTitle">
                <input value={ticket.title}
                       name = "title"
                       type = "text"
                       placeholder ="add title"
                       onChange={handleChange}
                       id="ticketTitle"
                       required/>
             </label>
          </div>

         
                <textarea value={ticket.description}
                       name = "description"
                      //type = "textArea"
                       placeholder ="add Description"
                       onChange={handleChange}
                       required/>
           

          <div>
            <label htmlFor="ticketCat">
                      <select name = "category" onChange={handleChange} value={ticket.Category}   id="ticketCat">
                        <option value="">
                            Select Category
                        </option>
                         <option value="hardware">
                            Hardware
                        </option>
                         <option value="software">
                            Software
                        </option>
                         <option value="network">
                            Network
                        </option>
                         <option value="hr">
                            HR
                        </option>
                      </select>
             </label>
          </div>

          <button type="submit">Submit</button>
      </form>


       <button onClick={() => navigate("/dashboard")}>
        Back to Dashboard
      </button>
    </div>
  )
}

export default CreateTicket;