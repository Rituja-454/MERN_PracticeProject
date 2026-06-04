import {Link} from "react-router-dom";

function Navbar(){
  return(
    <div style={{display:"flex" , justifyContent : "space-between",padding:"10px"}}>
      <h2>Ticket System</h2>
      <div >
         <Link to="/login" style={{paddingRight:"10px"}}>Login</Link>
      <Link to="/register">Sign up</Link>
      </div>
     

    </div>
  )
}

export default Navbar; 