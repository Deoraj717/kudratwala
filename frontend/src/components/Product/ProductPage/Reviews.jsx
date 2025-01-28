import React, { useContext, useEffect, useState } from 'react'
import img2 from '/images/img2.jpg'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
import {ProductContext} from "../../../Context/ProductContext.jsx";
import "./Reviews.css";

function Reviews() {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const {product_} = useContext(ProductContext);
    const [avgRating,setAvgRating] = useState(0);
    const id = product_._id;
    console.log(id);
    const [reviews,setReviews] = useState([])

    useEffect(() => {
        if(!id)return;
        const fetchReviews = async () => {
          try {
            console.log(id);
            const res = await axios.get(`${backendUrl}/review/getreview`, { params:{id} } );
            console.log(res);
            setReviews(res.data.data.reviews);
            setAvgRating(res.data.data.avg_review[0].averageRating)
          } catch (error) {
            console.error('Error fetching reviews:', error);
          }
        };
    
        fetchReviews();
      }, [id]);

    const customerReviews = reviews.length === 0 ? "No reviews" : reviews.map((review)=>(
        <div className='particular-review'>
            <div className='review-details'>
            <p className='review-desc'>{review.description}</p>
                <span className='reviewer'>Rating : {review.rating} out of 5 Star</span><span className='reviewer'>Username : {review.userName}</span>
            </div>
        </div>
    ))
  return (
    <div className='customer-review-container'>
      <h2 className='h2-rating'>Avg Rating :  {avgRating} out of 5</h2>
        {customerReviews}
    </div>
  )
}

export default Reviews