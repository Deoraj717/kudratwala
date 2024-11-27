// src/components/Registration.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the custom CSS file
import axios from 'axios';

const reg = () => {

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone:''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async function(e){
    e.preventDefault();
    const { confirmPassword, ...data } = formData;
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
    } else {
      try {
        console.log("jii");
        const res = await axios.post(`${backendUrl}/users/register`,data);
        navigate('/');
      } catch (error) {
        console.log(error);
        setError("Registration failed");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            {/* <label>Username</label> */}
            <input
              type="text"
              name="username"
               className='ints'
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            {/* <label>Email</label> */}
            <input
              className='ints'
              type="email"
              name="email"
              placeholder='email'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            {/* <label>phone</label> */}
            <input
               className='ints'
              type="Number"
              name="phone"
              placeholder='phone'
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            {/* <label>Password</label> */}
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
          <div className="form-group">
            {/* <label>Confirm Password</label> */}
            <input
               className='ints'
              type="password"
              name="confirmPassword"
              placeholder='confrim password'
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default reg;
