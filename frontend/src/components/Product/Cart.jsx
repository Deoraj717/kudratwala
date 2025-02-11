import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";  
import { Link } from 'react-router-dom';
import "./Cart.css";

function Cart() {


    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const url = `${backendUrl}/users/getCart`;
        const getProducts = async()=>{
            try {
                const res = await axios.get(url,{withCredentials:true});
                setProducts(res.data.data)
                console.log(products);
                setLoading(false)
            } catch (error) {
                if(error.status === 401)navigate("/login");
            }
        }
        getProducts();
    },[]);

    const buyNow = async()=>{

        try {
            var amount = 0;
            for (let index = 0; index < products.length; index++) {
                const element = products[index];
                amount+=element.price*element.quantity;
            }
    
            const res1 = await axios.get(`${backendUrl}/getkey`,{withCredentials:true})
            const key = res1.data.key;
            console.log(products);    
            const res2 = await axios.post(`${backendUrl}/payments/checkout`,{amount,products:products},{withCredentials:true})
            const order = res2.data.order
            const user = await axios.get(`${backendUrl}/getName`,{withCredentials:true})
    
            const data = {
                key,
                order
            }
    
            const options  =  {
                key, // Enter the Key ID generated from the Dashboard
                amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Kudrat Wala", //your business name
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                callback_url: `${backendUrl}/payments/paymentverification`,
                prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    name: `${user.name}`, //your customer's name
                    contact: `${user.phone}` //Provide the customer's phone number for better conversion rates 
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#3399cc"
                }
            };
            const razor = new Razorpay(options);
            razor.open();
            navigate("/");
        } catch (error) {
            navigate("/error_page");
        }
    }

    const removeProduct = async(product_id)=>{//remove from cart
        try {
            console.log("entering delete module")
            const url = `${backendUrl}/cart/remove`;
            const res = await axios.post(url,{productId:product_id},{withCredentials:true});
            const updatedCart = await axios.get(`${backendUrl}/users/getCart`, { withCredentials: true });
            setProducts(updatedCart.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    if(products && products.length === 0)return <h1>No Products in your cart</h1>
    return (
        <div className = "cart-page">
            <div className="blurred-background-cart"></div> 
        <div className="cart-container">
            {products && products.map(product=>(
                <div className = "single-product-cart">
                    <div className="cart-product-image">
                        <Link to = {`/products/${product._id}`}><img src = {product.img}/></Link>
                    </div>
                    <div className='cart-product-details'>
                        <h3>{product.name}</h3>
                        <h3> Rs {product.price} </h3>
                        <h3>Quantity : {product.quantity}</h3>
                    </div>
                    <div className = "delete-button" onClick={()=>removeProduct(product._id)}>
                            <MdDelete />
                    </div>
                </div>
            ))}
            <button className='buy-button' onClick = {buyNow}>buy now</button>
        </div>
        </div>
    )
}

export default Cart