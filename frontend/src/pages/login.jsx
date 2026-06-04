import {Link} from "react-router-dom";
import {useState } from "react";
import API from "../services/api";
import {useNavigate} from "react-router-dom";

function Login(){
  const navigate = useNavigate();
  const [form , setForm] =useState({
    email:"",
    password:""
  })

  const handleChange =(e)=>{
    setForm({...form , [e.target.name]:e.target.value});
  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
        const res=await API.post("/api/auth/login",form);
        //store token
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user" , JSON.stringify(res.data.user));     //object to string conversion

        alert("login successfully");
        console.log(res.data);

      navigate("/dashboard");
    }
    catch(error){
        console.error(error.response?.data || error.message);
        alert("login failed");
    }
  }

  return(
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <div>
             <label htmlFor="fullEmail">
              <input  value={form.email}
                      name="email"
                      type="email"
                      placeholder="enter email"
                      id="fullEmail"
                      onChange={handleChange}/>
          </label>
        </div>
        <div>
             <label htmlFor="pass">
              <input  value={form.password}
                      name="password"
                      type="password"
                      placeholder="enter password"
                      id="pass"
                      onChange={handleChange}/>
          </label>
        </div>
          <p>
             new User? <Link to="/register">Sign Up</Link>
          </p>

          <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;