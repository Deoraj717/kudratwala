import React from 'react'
import img1 from '/images/img1.jpg'
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import './ProductFrontPage.css';

function ProductFrontPage() {

    const product_details = {
        name:"bara ka podha",
        curr_price:219,
        mrp:500,
        desc:"lorem ipsum pfocm afkekf afkoef afkoae ak fieoa colfjoieaam afijefjal ajiejf ajfoej ajfo a oi aeijq reqir er er fcnvbvrv  vnsiaewri pjfcn09jr rn "
    }


  return (
    <div className='Container'>
        <div className='main-container'>
            <div className="images">
                img here
            </div>
            <div className="main-image">
                <img src = {img1}/>
            </div>
            <div className="main-details">
                <div className="product-details">
                    <h2>{product_details.name}</h2>
                    <h2>Rs. {product_details.curr_price}</h2>
                    <h2>Rs. {product_details.mrp}</h2>
                    <p>
                        {product_details.desc}
                    </p>
                </div>
                <div className="add-to-cart button">
                    <button>Add to Cart<FaShoppingCart  className='cart-icon'/></button>
                </div>
                <div className="wishlist button">
                    <button>WishList<FaHeart className='cart-icon'/></button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductFrontPage