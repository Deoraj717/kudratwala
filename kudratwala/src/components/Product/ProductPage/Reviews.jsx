import React from 'react'
import img2 from '/images/img2.jpg'

function Reviews() {

    const reviews = [
        {
            name:"saurav",
            rating:3,
            description:"product is good and i can use it for *** ",
            img:{img2}
        },
        {
            name:"saurav",
            rating:3,
            description:"product is good and i can use it for *** ",
            img:{img2}
        },
        {
            name:"saurav",
            rating:3,
            description:"product is good and i can use it for *** ",
            img:{img2}
        },
        {
            name:"saurav",
            rating:3,
            description:"product is good and i can use it for *** ",
            img:{img2},
            date:"22/10/2023"
        }
    ]
    const customerReviews = reviews.map((review)=>(
        <div className='particular-review'>
            <div classname = "review-image" >
                <img src = {review.img}/>
            </div>
            <div className='review-details'>
                <p className='review-desc'>{review.description}</p>
                <span className='reviewer'>{review.name}</span><span className='reviewer'>{review.date}</span>
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