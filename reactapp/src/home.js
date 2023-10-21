import axios from "axios";
import React,{useState, useEffect} from "react";
import { useCookies } from "react-cookie";
import apiUrl from "./url";
import { json, useNavigate, Link } from "react-router-dom";
import "./css/home.css";

const Home = () => {
        const [cookies, removeCookie] = useCookies(['myvalue']);
        const navigate = useNavigate();
        const [update,setUpdate] = useState(false);
        const [updata,setUpdata] = useState({})
        const [empdata, setEmpdata] = useState([]);
        const token = cookies.myvalue;
        useEffect(() => {
            if (!token) {
              navigate('/');
            } else {
              axios.get(`${apiUrl}data`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${token}`,
                },
              })
              .then(res => setEmpdata(res.data))
              .catch(error => {
                if (error.response && error.response.status === 401) {
                  console.error('Unauthorized: Token is invalid or expired');
                  // Redirect to login or handle unauthorized access
                  navigate('/');
                } else {
                  console.error('Error:', error);
                }
              });
            }
          }, [cookies.myvalue]);
          function deleteHandler(userid) {
            axios
              .delete(`${apiUrl}data?userid=${userid}`, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${token}`,
                },
              })
              .then(() => {
                // Refresh the data after deletion
                setEmpdata(empdata.filter((user) => user.userid !== userid));
              })
              .catch((error) => {
                if (error.response && error.response.status === 401) {
                  console.error('Unauthorized: Token is invalid or expired');
                  navigate('/');
                } else {
                  console.error('Error:', error);
                }
              });
          }
         
          
    return(
      <div className="main-div">
      <div>
        <table>
          <th>Userid</th>
          <th>Name</th>
          <th>Age</th>
          <th>Role</th>
          <th>Department</th>
          <th>Experience</th>
          <th>Salary</th>
          <th>dp</th>
          <tr></tr>
          {empdata.map((value, index) => (
            <tr key={index}>
              <td>
                <Link to={`/update/${value.userid}`}>{value.userid}</Link>
              </td>
              <td>{value.name}</td>
              <td>{value.age}</td>
              <td>{value.role}</td>
              <td>{value.department}</td>
              <td>{value.experience}</td>
              <td>{value.salary}</td>
              <td>
                <img className="dp" src={`http://127.0.0.1:8000/${value.dp}`} />
              </td>
              <td>
                <button onClick={() => deleteHandler(value.userid)}>
                  delete
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
    );
}

export default Home;