import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/update.css";
import apiUrl from "./url";

const Insert = () => {
  const [cookies, removeCookie] = useCookies(['myvalue']);
  const navigate = useNavigate();
  const [empdata, setEmpdata] = useState([]);
  const token = cookies.myvalue;
  useEffect(() => {
    if (!token) {
      navigate('/');
    }})

  
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
  axios.post(`${apiUrl}data`, formData, {
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
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <label>userid</label>
          <input
            name="userid"
            value={empdata.userid || ''}
            onChange={updateHandler}
          />
          <label>Name</label>
          <input name="name"  onChange={updateHandler} />
          <label>Age</label>
          <input name="age"  onChange={updateHandler} />
          <label>Role</label>
          <input name="role"  onChange={updateHandler} />
          <label>Department</label>
          <input name="department" onChange={updateHandler} />
          <label>Experience</label>
          <input name="experience" onChange={updateHandler} />
          <label>Salary</label>
          <input name="salary" onChange={updateHandler} />
          <input
            type="file"
            name="dp"
            accept="image/*"
            onChange={handleFileChange}
          />
          <button type="submit">Insert</button>
        </form>
      </div>
    </div>
  );



}
export default Insert;