import React,{useState} from 'react';
import { Route, BrowserRouter, Routes, useNavigate, Link } from 'react-router-dom';
import Home from './home';
import Login from './Login';
import Insert from './insert';
import Update from './update';
import Signup from './signup';
import { CookiesProvider, useCookies } from "react-cookie";
import "./css/App.css";
import axios from "axios";
import apiUrl from "./url";

function App() {
  const [cookies, removeCookie] = useCookies(['myvalue']);
  const [token, setToken] = (cookies.myvalue);
   const [navv, setNav] = useState("");
   const navHandler = () => {
    setNav("nav")

   }
   const navLogin = () => {
    setNav("")
   }
   const logoutHandler = () => {
    const currentToken = cookies.myvalue;
  
    axios.post(`${apiUrl}logout`, null, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${currentToken}`,
      },
    }).then(() => {
      removeCookie('myvalue');
      // If you want to navigate to the login page after logout
      setNav("");
      setToken("")
    }).catch(error => {
      if (error.response && error.response.status === 401) {
        console.error('Unauthorized: Token is invalid or expired');
      } else {
        console.error('Error:', error);
      }
    });
  };
  

  return (
    <CookiesProvider>
    <div className="main">
      <BrowserRouter>
      <div className='navbar'>
        <div className='navhead'>
          <h2>Data management</h2>
        </div>
        { !token ?
        <div className='nav'>     
        { !navv ?
          <Link to="/signup" className='navs' onClick={navHandler}><button className='btn1'>signup</button></Link>:
          <Link to="/" className='navs' onClick={navLogin}><button className='btn1'>login</button></Link>
        }
       </div>:<div className='nav'>     
          <Link to="/home"><button className='btn1'>Home</button></Link>
          <Link to="/insert"><button className='btn1'>insert</button></Link>
          <Link to="/"><button className='btn1' onClick={logoutHandler}>logout</button></Link>

       </div>
}
      </div>

        <div>
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path="/insert" element={<Insert />}/>
        <Route exact path="/update/:userid" element={<Update />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
      </div>
      </BrowserRouter>
      
     
    </div>
    </CookiesProvider>
  );
}

export default App;