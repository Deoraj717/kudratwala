import React, { useEffect,useState } from 'react'
import Orders from "./Orders.jsx"
import axios from 'axios';
import './Profile.css';
import { Link } from 'react-router-dom';

function Profile() {

  const [user,setUser] = useState({});
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const url = `${backendUrl}/users/getUser`;

  useEffect(()=>{
    try {
      const getUser = async()=>{
        const user_det = await axios.get(url,{withCredentials:true});
        console.log(user_det.data);
        setUser(user_det.data);
      }

      getUser();
    } catch (error) {
      console.log(error);
    }
  },[])

  return (
    <div className='profile-page'>
      {/* Separate Blurred Background */}
      <div className="blurred-background"></div>  

      {/* Main Content */}
      <div className="profile">
        <div className="user-details">
          <h3>Name: {user.username}</h3>
          {user.address && (
            <div className="user-address">
              <h3>State: {user.address.state}</h3>
              <h3>City: {user.address.city}</h3>
              <h3>Pin: {user.address.pin}</h3>
            </div>
          )}
          <div>
            <Link to="/update">update details</Link>
          </div>
        </div>

        <h1>My Orders</h1>
        <div className="orders">
          <Orders />
        </div>
      </div>
    </div>
  )
}

export default Profile