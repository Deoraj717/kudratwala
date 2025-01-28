import { useState,useEffect } from "react";
import React from 'react'
import axios from "axios";
import { Link } from "react-router-dom";


function Orders() {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [orders,setOrders] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
      const url = `${backendUrl}/users/orders`;
      const getOrders = async()=>{
          try {
              const res = await axios.get(url,{withCredentials:true});
              setOrders(res.data)
              console.log(res.data);
              setLoading(false)
          } catch (error) {
              if(error.status === 401)navigate("/login");
          }
      }
      getOrders();
  },[]);  
  if(loading)return <h1>Loading your orders</h1>
  return (
    <div className="cart-container">
                {orders.map(order=>(
                    <div>
                    <div>{
                    order.products.map(
                        product=>(
                            <div className = "single-product-cart">
                                <div className="cart-product-image">
                                    <Link to = {`/products/${product._id}`}><img src = {product.img}/></Link>
                                </div>
                                <div className='cart-product-details'>
                                    <h3>{product.name}</h3>
                                    <h3> Rs {product.price} </h3>
                                    <h3>Quantity : {product.quantity}</h3>
                                    <h3> Buyed on : {new Date(order.updatedAt).toISOString().split("T")[0]}</h3>
                                </div>
                            </div>
                        )
                    )}
                    </div>
                    </div>
                ))}
                {/* <button className='buy-button' onClick = {buyNow}>buy now</button> */}
            </div>
  )
}

export default Orders