import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "./media/login.png";
import "./css/login.css";
import apiUrl from "./url";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useCookies(["myvalue"]);
  const navigate = useNavigate();

  const LoginhandleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${apiUrl}login`, { "username": username, "password": password })
      .then(response => setToken("myvalue", response.data.token))
      .catch(error => console.error("Error:", error));
  };
useEffect(()=>{
  if (token["myvalue"]){
  navigate("/home");
}
},[token])
return (
  <div className="login">
    <div className="imagelock">
      <img className="lock" src={image} alt="Logo"  />
    </div>
    <div className="logindetails">
    <div className="card">
        <h2 className="text">Login form</h2>
       <div className="form">
      <form onSubmit={LoginhandleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit" className="btn" >submit</button>
      </form>
      </div>
      </div>
  </div></div>
);

}

export default Login;
