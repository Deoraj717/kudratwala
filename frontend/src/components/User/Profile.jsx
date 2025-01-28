import React, { useEffect,useState } from 'react'
import Orders from "./Orders.jsx"
import axios from 'axios';

function Profile() {
  return (
    <div>
      <h1>My Orders</h1>
        <div className="orders">
          <Orders/>
        </div>
        {/* <div className="feedback-form">
          <h1>Your feedback matters</h1>
          <Feedback/>
        </div> */}
    </div>
  )
}

export default Profile