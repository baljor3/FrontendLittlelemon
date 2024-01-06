import React from "react"
import "../Css/Footer.css"


const doormatNav =[
    {
        name: "Home",
        link: "/home",
    },
    {
        name: "About",
        link: "/about",
    },
    {
        name: "Menu",
        link: "/menu",
    },
    {
        name: "Reservation",
        link: "/reservation",
    },
    {
        name: "Order Online",
        link: "/order",
    },
    {
        name: "Login",
        link: "/login",
    }
];

const contact = [
    {
        name: "Address",
        link: "/address"
    },
    {
        name: "phone number",
        link: "/number",
    },
    {
        name: "email",
        link: "/email"
    }
];


const  Footer = () =>{
    return (<footer style = {{"background-color":"#D6D26D"}}>
    <div className="flex-container-footer">
        <div style={{"margin": 10}}><p>Doormat Navigation</p>
        {doormatNav.map(door =>(
            <div><a href={door.link}>{door.name}</a></div>
        ))}
        </div>
        <div style={{"margin": 10}}>
            <p>contact</p>
            {contact.map(con =>(
                <div><a href={con.link}>{con.name}</a></div>
            ) )}
        </div>
        <div style={{"margin":10}}>
            <p>Social Media</p>
            {contact.map(con =>(
                <div><a href={con.link}>{con.name}</a></div>
             ))}
        </div>
    </div>

    </footer>);
};

export default Footer;