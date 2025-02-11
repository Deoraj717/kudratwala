// src/components/Login.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the custom CSS file
import axios from 'axios';
import { userContext } from '../../Context/UserContext.jsx';


const login = () => {
  const user = useContext(userContext);
  const navigate = useNavigate()
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const url = `${backendUrl}/users/login`
      const res = await axios.post(url,formData,{withCredentials:true});
      if(res.status==200){
        user.setLogin(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login : </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
          
            <input
              className='ints'
              type="text"
              name="username"
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
          
            <input
              className='ints'
              type="password"
              name="password"
              placeholder='password'
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
      
      </div>
    </div>
  );
};

export default login;
