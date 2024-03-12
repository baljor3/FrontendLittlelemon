import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";
import { AuthContext } from "./auth";
import '../Css/login.css';

const Login = () => {
    const cookies = new Cookies();
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const navigate = useNavigate();
    const { logIn } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const login = async (user, pass) => {
        try {
            const response = await fetch('https://backend-littlelemon.vercel.app/api/login', {
                method: 'POST',
                body: JSON.stringify({ username: user, password: pass }),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const data = await response.json();
            if (data === false) {
                setErrorLogin("Incorrect username or password");
                cookies.set("jwt_authorization", "");
            } else {
                setErrorLogin("");
                cookies.set("jwt_authorization", data);
                logIn();
                navigate("/");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <label htmlFor="username" >Username</label>
                <input
                    id="username"
                    className="label-text-login"
                    type="text"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />

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

                <span className="error-message">{errorLogin}</span>
                <div>
                <button type="submit" className="button-login">Login</button>
                <Link to="/register" className="Link"> <button className="button-login"> Register </button> </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;