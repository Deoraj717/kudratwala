import React, { useContext, useEffect, useState } from 'react'
import img2 from '/images/img2.jpg'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
import {ProductContext} from "../../../Context/ProductContext.jsx";

function Reviews() {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    
    const {product_} = useContext(ProductContext);
    const id = product_._id;
    console.log(id);
    const [reviews,setReviews] = useState([])

    useEffect(() => {
      console.log("jio");
        if(!id)return;
        const fetchReviews = async () => {
          try {
            console.log(id);
            const res = await axios.get(`${backendUrl}/review/getreview`, { params:{id} } );
            console.log(res);
            setReviews(res.data.data);
          } catch (error) {
            console.error('Error fetching reviews:', error);
          }
        };
    
        fetchReviews();
      }, [id]);

    // const reviews = [
    //     {
    //         name:"saurav",
    //         rating:3,
    //         description:"product is good and i can use it for *** ",
    //         img:{img2}
    //     },
    //     {
    //         name:"saurav",
    //         rating:3,
    //         description:"product is good and i can use it for *** ",
    //         img:{img2}
    //     },
    //     {
    //         name:"saurav",
    //         rating:3,
    //         description:"product is good and i can use it for *** ",
    //         img:{img2}
    //     },
    //     {
    //         name:"saurav",
    //         rating:3,
    //         description:"product is good and i can use it for *** ",
    //         img:{img2},
    //     }
    // ]

    // const {reviews} = useContext(productContext);
    console.log(reviews);

    const customerReviews = reviews.length === 0 ? "No reviews" : reviews.map((review)=>(
        <div className='particular-review'>
            <div className = "review-image" >
                <img src = {review.img}/>
            </div>
            <div className='review-details'>
                <p className='review-desc'>{review.description}</p>
                <span className='reviewer'>{review.userName}</span><span className='reviewer'>{review.rating} out of 5 Star</span>
            </div>
        </div>
    ))
  return (
    <div className='customer-review-container'>
        {customerReviews}
    </div>
  )
}

export default Reviews