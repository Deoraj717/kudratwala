import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {

    const navigate = useNavigate();
    setTimeout(()=>{
        navigate("/");
    },5000)

  return (
    <div className='error-css'>
        Server run in an issue with your request ... Redirecting to home page
    </div>
  )
}

export default Error