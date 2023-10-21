import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiUrl from "./url";
import "./css/update.css";

const Update = () => {
  const [cookies, removeCookie] = useCookies(['myvalue']);
  const navigate = useNavigate();
  const [empdata, setEmpdata] = useState({});
  const token = cookies.myvalue;
  const { userid } = useParams();
  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      axios.get(`${apiUrl}data?userid=${userid}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      })
        .then(res => {
          setEmpdata(res.data);
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            console.error('Unauthorized: Token is invalid or expired');
            navigate('/');
          } else {
            console.error('Error:', error);
          }
        });
    }
  }, [cookies.myvalue, userid, token, navigate]);


  const updateHandler = (e) => {
    setEmpdata({
      ...empdata,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userid', empdata.userid);
    formData.append('name', empdata.name);
    formData.append('age', empdata.age);
    formData.append('role', empdata.role);
    formData.append('department', empdata.department);
    formData.append('experience', empdata.experience);
    formData.append('salary', empdata.salary);
    if (empdata.dp instanceof File) {
      formData.append('dp', empdata.dp);
    }

    axios.put(`${apiUrl}data?userid=${userid}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${token}`,
      },
    })
      .then(res => {
        console.log('Update successful:', res.data);
        navigate('/home');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleFileChange = (e) => {
    setEmpdata({
      ...empdata,
      [e.target.name]: e.target.files[0],
    });
  };

  return (
    <div className="main-div">
      <div>
        <h1>Update page</h1>
        {Object.keys(empdata).length > 0 && (
          <form onSubmit={submitHandler} encType="multipart/form-data">
            <label>userid</label>
            <input
              name="userid"
              value={empdata.userid || ''}
              onChange={updateHandler}
            />
            <label>Name</label>
            <input name="name" value={empdata.name} onChange={updateHandler} />
            <label>Age</label>
            <input name="age" value={empdata.age} onChange={updateHandler} />
            <label>Role</label>
            <input name="role" value={empdata.role} onChange={updateHandler} />
            <label>Department</label>
            <input name="department" value={empdata.department} onChange={updateHandler} />
            <label>Experience</label>
            <input name="experience" value={empdata.experience} onChange={updateHandler} />
            <label>Salary</label>
            <input name="salary" value={empdata.salary} onChange={updateHandler} />
            <input
              type="file"
              name="dp"
              accept="image/*"
              onChange={handleFileChange}
            />
            <button type="submit">Update</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Update;
