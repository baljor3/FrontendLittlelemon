import React, { useContext, useEffect } from "react"
import { Box} from "@chakra-ui/react";
import "../Css/Nav.css"
import logo from "../asset/logo.png"
import { Link, NavLink  } from 'react-router-dom';
import Cookies from "js-cookie";
import { AuthContext } from './auth';

const navlinks = [
    {
        name: "Home",
        link: "/",
    },
    {
        name:"Menu",
        link:"/menu",
    },
    {
        name:"Reservations",
        link:"/booking",
    },

    {
        name:"cart",
        link:"/cart",
    },


];

const image =[
    {
        source: "./Assets/images/Logo.png",
        name:  "Log",
    }
];

const Nav = () =>{
    const jwtToken = Cookies.get('jwt_authorization')
    const { isLoggedIn, logOut } = useContext(AuthContext);

    useEffect(()=>{
        fetch("http://localhost:8080/api/getCookies",{
            headers:{
                "token": jwtToken,
                'Content-type': 'application/json'
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(new Date().getTime())
            console.log(data["time"]*1000)
        })
    },[isLoggedIn])

    const Logout = () =>{
        Cookies.remove('jwt_authorization')
        logOut();
        window.location.reload();
    }

return (
    <nav style = {{"background-color":"#D6D26D"}}>
        <Box maxW = "sm" maxH = "sm">
        <div class = "flex-container" >
        <img src= {logo} alt = "Logo" />
        {navlinks.map((navlink) => (
            <NavLink  key = {navlink.name} to={navlink.link} className="flex-item-nav"> {navlink.name}</NavLink>
        ))}
        <div style={{marginTop:"10px", marginLeft:"7px"}}>
        {isLoggedIn ? <Link onClick={Logout} className="log">Logout</Link>  :  <Link key = "login" to = "/login" 
        className="log" > Login</Link>}
        </div>
        </div>
        </Box>
    </nav>);

};
export default Nav;