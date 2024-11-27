import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import plant from '/images/snake.jpg';

function ProductTile() {
  return (
    <div className='product-tile'>
        <img src = {plant} alt = "image url"/>
        <div className='product-tile-price'><span className='previous-price'>Rs 500</span><span className='new-price'>Rs 200</span></div>
        <div className="product-tile-name">Baigan</div>
        <div className="product-tile-rating">5 5 5 5 5</div>
        <div className="product-tile-add-to-cart-button"><button>Add To Cart <FaCartShopping className='product-tile-cart-icon'/></button></div>
    </div>
  )
}

export default ProductTile