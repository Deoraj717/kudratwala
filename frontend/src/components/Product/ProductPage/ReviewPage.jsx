import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {ProductContext} from "../../../Context/ProductContext.jsx";
import axios from 'axios';

import "./ReviewPage.css";

function ReviewPage() {


  const {product_} = useContext(ProductContext);
  if (!product_) {
    return <div>Loading product details...</div>;
  }
  const id = product_._id;  

  const [formData,setFormData] = useState({
    userName:'',
    reviews:{
      rating:'',
      description:''
    },
  })

  const [res,setRes] = useState("")

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
        const url = `${backendUrl}/review/postreview`;
        console.log(url)

        const payload = {
          productId:id,
          userName: formData.userName,
          reviews:{
            rating: formData.reviews.rating,
            description: formData.reviews.description,
          },
        };
        console.log(payload);

        const res = await axios.post(url,payload,{withCredentials:true});
        console.log(res);
        setRes("Review added");

        setTimeout(()=>{
          setRes("");
        },2000);

      } catch (error) {
        console.log(error);
      }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'rating' || name === 'description') {
      setFormData((prev) => ({
        ...prev,
        reviews: {
          ...prev.reviews,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };


  return (
    <div className='review-container'>
      <div className="review-box">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User name</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Rating</label>
            <select
              name="rating"
              value={formData.reviews.rating}
              onChange={handleChange}
              required
            >
              <option value="">Select a rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.reviews.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="auth-button" onClick = {handleSubmit}>
            Upload Review
          </button>
        </form>
        <p>{res}</p>
        </div>
    </div>
  )
}

export default ReviewPage