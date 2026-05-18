import {Link} from "react-router-dom";
import {useState} from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";

function Register(){
  const navigate = useNavigate();
  const [form ,setForm] = useState({
    name:"Rituja",
    email:"ritu@gmail.com",
    password:"ritu123",
    role:""
  });

  const handleChange = (e)=>{
      setForm({...form ,[e.target.name] : e.target.value});
  }

  const handleSubmit = async (e)=>{
     e.preventDefault();
    try{
       const res =await API.post("/api/auth/register" ,form);
      
       alert("user register successfully");
       console.log(res.data);

       navigate("/login");

    }
    catch(error){
       // console.error(error.response?.data || error.message);
        //alert("registration failed");
       // alert(error.response?.data?.message);
       console.log("FULL ERROR:", error);

        console.log("BACKEND RESPONSE:", error.response);

        console.log("ERROR DATA:", error.response?.data);

        alert(error.response?.data?.message || "Registration Failed");
    }
  }

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="fullName">
            <input value={form.name}
                    name ="name"
                    type ="text"
                    onChange = {handleChange}
                    id="fullName"
                    placeholder="enter name"/>
          </label>
        </div>
        <div>
            <label htmlFor="fullEmail">
            <input value={form.email}
                    name ="email"
                    type ="email"
                    onChange = {handleChange}
                    id="fullEmail"
                    placeholder="enter email"/>
          </label>
        </div>
        <div>
            <label htmlFor="pass">
            <input value={form.password}
                    name ="password"
                    type ="password"
                    onChange = {handleChange}
                    id="pass"
                    placeholder="enter password"/>
          </label>
        </div>
        <label htmlFor="roleDetails">
              <select value={form.role}
                      name = "role"
                      id="roleDetails"
                      onChange={handleChange}>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
              </select>
        </label>
        <p>
          Already have an account?
          <Link to="/login">Login</Link>
        </p>
        
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register;