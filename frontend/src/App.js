import React from "react";
import {BrowserRouter ,Routes , Route} from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import CreateTicket from "./pages/createTicket";
import Navbar from "./components/Navbar";
//import API from "./services/api";
import TicketDetails from "./pages/ticketDetails";

function App() {
  return (
   <BrowserRouter>
        <Navbar/>

        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/createTicket" element={<CreateTicket/>}/>
            <Route path="/ticketDetails/:id" element={<TicketDetails/>}/>
        </Routes>
   </BrowserRouter>
  );
}

export default App;
