import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Feedback() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const pid = useParams();
  const navigate = useNavigate();
  
  const [formData,setFormData] = useState({
    rating:'',
    description:''
  })
  const [review,setReview] = useState(false);

  const handleChange = (e)=>{
    const {name,value} = e.target;
    setFormData((prev)=>({...prev,[name]:value}))
  }

  const handleSubmit = async()=>{
    try {
      const url = `${backendUrl/product/review}`;
  
      const res = await axios.post(url,{rating:formData.rating,description:formData.description,_id:pid});

      setReview(true);
    } catch (error) {
      console.log(error);
      if(error.status===401)navigate("/login");
    }
  }

  return (
    <div className='feedback-form'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Rating</label>
              <select name="rating">
                <option value="1">one star</option>
                <option value="2">two star</option>
                <option value="3">three star</option>
                <option value="4">four star</option>
                <option value="5">five star</option>
              </select>
          </div>
          <div className="form-group">
            <label>Review description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="auth-button">
            Done
          </button>
        </form>
    </div>
  )
}

export default Feedback