import React, {useState} from "react";
import {Link }from 'react-router-dom';
import'../Css/login.css'

const Register = () => {
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorUser, setErrorUser] = useState();
    const [errorEmail, setErrorEmail] = useState();
    const [errorPass, setErrorPass] = useState();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const addUser = async(username,email,password) =>{
        await fetch('https://backend-littlelemon.vercel.app/api/logininsert',{
            method: 'POST',
            body: JSON.stringify({
               "username": username,
               "email": email,
               "password":password,
            }),
            headers: {
               'Content-type': 'application/json',
            },
            mode :"cors",
            })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            })
        }

    function hasWhiteSpace(str) {
        var b = false;
            for (let i = 0; i < str.length; i++) {
              if (str[i] === ' ' || str[i] === '\t' || str[i] === '\n' || str[i] === '\r') {
                return b = true; // Found a white space character
            }
        }
        return false; // No white space character found
    }
        
    const checkUserName = (user) => {

        var bool = false;
        bool = hasWhiteSpace(user)
        if(bool === true){
            setErrorPass("there is whitespace in your username")
            return bool = true;
        }
        if(user.length < 4){
            setErrorUser("Username is too short")
            return true;
        }
        else{
            setErrorUser("")
        }
    }

    const checkEmail = (email) => {
        var bool = false;
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        bool = hasWhiteSpace(email)
        if(bool === true){
            setErrorPass("there is whitespace in your email")
            return bool = true;
        }

        if (!emailRegex.test(email)) {
            setErrorEmail("Incorrect Email format")
            return bool = true;
        }else{
            setErrorEmail("")
        }

    }

    const checkPassword = (p) => {
        var bool = false;
        bool = hasWhiteSpace(p)
        if(bool === true){
            setErrorPass("there is whitespace in your password")
            return bool = true;
        }

        if(p.length < 4){
            setErrorPass("Password too short")
            return bool = true;
        }else{
            setErrorPass("")
        }
    }

    const submitdata =(e)=>{
        e.preventDefault();
        console.log(username)
        var bool = false;
        bool =checkUserName(username)
        if(bool === true){
            return;
        }
        bool =checkEmail(email)
        if(bool === true){
            return;
        }
        bool = checkPassword(password)
        if(bool === true){
            return;
        }
        addUser(username,email,password)
        alert("the data was added")
    }

    return(
        <div className="login-container">
    <form className="login-form" onSubmit={submitdata}>
            <label htmlFor="username">Username</label>
            <input id = "username"
            className="label-text-login"
            onChange={(e)=> setUserName(e.target.value)}
            required></input>
            <span >  {errorUser}  </span>

            <label htmlFor="email">Email</label>
            <input id ="email"
            className="label-text-login"
            onChange={(e)=> setEmail(e.target.value)}
            required></input>
            <span  >  {errorEmail}  </span>

            <label htmlFor="password">Password</label>
            <div className="password-input-container">
                    <input
                        id="password"
                        className="label-text-login"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className="toggle-password" onClick={togglePasswordVisibility}>
                        {showPassword ? "👁️" : "🔒"}
                    </span>
                </div>
            <span >  {errorPass}  </span>

            <div>
            <button type="submit" className="button-login"> Register </button>
            <Link to="/login" className="Link"> <button className="button-login"> Login </button> </Link>
            </div>
    </form>
    </div>
    )
}

export default Register;