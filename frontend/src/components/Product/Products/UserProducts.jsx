import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdRateReview } from "react-icons/md"; 

function UserProducts() {


    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [productIds,setProductIds] = useState([]);
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const url = `${backendUrl}/users/getUserProducts`;
        const getProductIds = async()=>{
            try {
                const res = await axios.get(url);
                setProductIds(res.data)
            } catch (error) {
                if(error.status === 401)navigate("/login");
            }
        }
        getProductIds();
    },[]);

    const reviewProduct = (id)=>{
        navigate(`review/${id}`)
    }
    
    useEffect(()=>{
        const getProductDetails = async()=>{
            try {
                const product_details = productIds.map(id=>axios.get(url));
                const responses = await Promise.all(product_details);
                const productsData = responses.map(res => res.data);
                setProducts(productsData);
                const products_in_cart = await Promise.all(product_details);
                setProductIds(products_in_cart);
            } catch (error) {
                console.log(error);
                if(error.status === 401)navigate("/login");
            }
        }
        getProductDetails();
        setLoading(false);
    },[productIds]);


    if(loading)return <h1>Loading...</h1>

    return (
        <div className="user-product-container">
            {products.map(product=>(
                <div className = "user-product-list">
                    <div className="user-product-image">
                        <img src = ""/>
                    </div>
                    <div className='user-product-details'>
                        <h3> product.price </h3>
                        <h3>product.cart.quantity</h3>
                        <div className = "review-button" onClick={()=>reviewProduct(product._id)}>
                            <MdRateReview />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserProducts