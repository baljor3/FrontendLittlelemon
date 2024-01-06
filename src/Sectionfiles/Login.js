import React, {useState, createContext, useContext} from "react"
import {Link, useNavigate  }from 'react-router-dom';
import Cookies from "universal-cookie"
import { AuthContext } from "./auth"


const Login = () => {

    const cookies = new Cookies();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [errorLogin, setErrorrLogin] = useState();
    const navigate = useNavigate()
    const { logIn } = useContext(AuthContext)

    const login = async(user, pass) =>{
        await fetch('http://localhost:8080/api/login',{
            method: 'POST',
            body: JSON.stringify({
               "username":user,
               "password":pass
            }),
            headers: {
                'Content-type': 'application/json'
            }
            })
            .then((res) => res.json())
            .then((data) => {
              if(data === false){
                setErrorrLogin("Incorrect password or username")
                cookies.set("jwt_authorization","")
                console.log(cookies)
              }else{
             setErrorrLogin("")
             cookies.set("jwt_authorization",data)
             logIn();
             navigate("/")
              }
            })
            .catch(error =>{
                console.log(error)
            })
        }

    const k=(e) =>{
        e.preventDefault()
        login(username, password)
    }

    return(
        <body style={{backgroundColor:"#5C7600",display:"flex" ,justifyContent:"center", alignItems: "center"}}>
    <form style={{"display": 'grid', "max-width": 200, "gap": 20}} onSubmit={k}> 
            <label>Username</label>

            <input id = "username"
            onChange={(e)=> setUserName(e.target.value)}
            required></input>

            <label>Password</label>

            <input id="password"
            onChange={(e)=> setPassword(e.target.value)} required></input>

            <span>{errorLogin}</span>
            <button type="submit">Login</button>
            <Link to="/register"><button>Register</button> </Link>
    </form>
    </body>
    )
}

export default Login;