// src/components/Registration.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; // Import the custom CSS file
import axios from 'axios';

const Update = () => {

  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    email: '',
    phone:'',
    address:{
      city:'',
      state:'',
      pin:''
    }
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];

      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async function(e){
    e.preventDefault();
      try {
        console.log("jii");
        const res = await axios.post(`${backendUrl}/users/update`,formData,{withCredentials:true});
        navigate('/');
      } catch (error) {
        console.log(error);
        setError("Registration failed");
      }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Update details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className='ints'
              type="email"
              name="email"
              placeholder='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
               className='ints'
              type="Number"
              name="phone"
              placeholder='phone'
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
               className='ints'
              type="text"
              name="address.city"
              placeholder='city'
              value={formData.address.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
               className='ints'
              type="text"
              name="address.state"
              placeholder='state'
              value={formData.address.state}
              onChange={handleChange}
            />
            </div>
            <div className="form-group">
            <input
              className='ints'
              type="text"
              name="address.pin"
              placeholder='pin code'
              value={formData.address.pin}
              onChange={handleChange}
            />  
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="auth-button">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
