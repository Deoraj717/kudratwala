import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Seller.css';

function Seller() {

  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    shop:'',
    city:'',
    state:'',
    pin:'',
  })

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        const url = `${backendUrl}/users/register_seller`;
        console.log(url)
        const res = await axios.post(url,{formData},{withCredentials:true});
        console.log(res);
        navigate("/sell")
      } catch (error) {
        console.log(error);
      }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
    
  return (
    <div className='auth-container'>
      <div className="auth-box">
        <h1>Register for seller</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Shop name</label>
            <input
              type="text"
              name="shop"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Pin code</label>
            <input
              type="text"
              name="pin"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button" onClick = {handleSubmit}>
            Register for seller
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
        </div>
    </div>
  )
}

export default Seller