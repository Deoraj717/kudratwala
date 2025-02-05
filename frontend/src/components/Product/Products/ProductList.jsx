// ProductList.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProductList.css';
import { useState } from 'react';
import { AddToCart } from '../../../utils/add-to-cart';

const ProductList = ({ product}) => {

  const [msg,setMsg] = useState("Add to Cart");
  const [isAdded,setIsAdded] = useState(false);
  const navigate = useNavigate();

  const handleCart = (product)=>{
    AddToCart(product,setMsg,setIsAdded,navigate);
  };

  return (
          <div className="product">
              <Link to = {`${product._id}`} className='link'>
                <div className='product-ims'>
                  <img src={product.image} alt={product.name} className="product-page-product-image" />
                </div>
              </Link>
              <div className="product-details">
                <h3>{product.product_name}</h3>
                <h4>Category: {product.plant_type}</h4>
                <h4>Price: ${product.price}</h4>
                <button className="add-to-cart" onClick = {()=>{handleCart({_id:product._id,price:product.price,quantity:1})}}>{msg}</button>
              </div>
          </div>
  );
};

export default ProductList;
