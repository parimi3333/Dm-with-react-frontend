import React, { createContext, useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "./media/login.png";
import "./css/login.css";
import apiUrl from "./url";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const signuphandleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${apiUrl}register`, { "username": username, "password": password })
      .then(response => {
        console.log(response);
        navigate('/');
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  

return (
        <div className="card">
        <h2 className="text">signup form</h2>
      <form onSubmit={signuphandleSubmit}>
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
);

}

export default Signup;
