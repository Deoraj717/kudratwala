import React,{useState,useEffect,useContext} from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import './ProductFrontPage.css';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import ProductDesc from './ProductDesc';
import {ProductContext} from "../../../Context/ProductContext.jsx";
import axios from 'axios';

function ProductFrontPage() {

    const {product_,setProduct_} = useContext(ProductContext);
    const [quantity,setQuantity] = useState(1);

    const navigate = useNavigate()

    const id = useParams().id;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const url = `${backendUrl}/products/getproduct/${id}`;

    const [msg,setMsg] = useState("Add To Cart")
    const [isAdded, setIsAdded] = useState(false);

    useEffect(()=>{
        const getProduct = async () => {
            try {
                console.log(id);
                const res = await axios.get(url)
                setProduct_(res.data.data)
                console.log(product_);
            } catch (error) {
                console.log(error);
            }
        };
        getProduct();
    },[])

    const checkoutHandler = async (amount)=>{
        try {

            const res1 = await axios.get(`${backendUrl}/getkey`,{withCredentials:true})
            const key = res1.data.key;
            const res2 = await axios.post(`${backendUrl}/payments/checkout`,{amount:amount*quantity,products:product_},{withCredentials:true})
            const order = res2.data.order
            const user = await axios.get(`${backendUrl}/getName`,{withCredentials:true})
            const data = {
                key,
                order
            }
            console.log(data)//just to check
    
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
            console.log(error);
            navigate("/error");
        }

    }

    const AddToCart = async()=>{
        try {
            const url = `${backendUrl}/cart/add`;
            console.log(url);
            const res = await axios.post(url,{_id:product_._id,price:product_.price,quantity}, { withCredentials: true });
            console.log(res);
            if(res.status==200){
                setMsg("Product added to cart")
                setIsAdded(true);
                setTimeout(()=>{
                    setMsg("Add To Cart")
                    setIsAdded(false);
                },3000)
            }
            if(res.status == 404)navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        if (value === '' || /^[0-9]+$/.test(value)) {
          setQuantity(value);
        }
    };

    if(!product_)return <h1>Loading...</h1>



  return (
    <div className='product-front-page-Container'>
        <div className='product-front-page-main-container'>
            <div className="product-front-page-main-image">
                <img src = {product_.image}/>
            </div>
            <div className="product-front-page-main-details">
                <div className="product-front-page-product-details">
                    <h2>{product_.product_name}</h2>
                    <h2>Rs. {product_.price}</h2>
                    <p>
                        {product_.description}
                    </p>
                </div>
                <div className="product-quantity">
                    Insert Quantity : 
                    <input
                        id="quantity"
                        type="text"
                        value={quantity}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button className="product-front-page-button" onClick = {AddToCart}>{msg}{!isAdded && <FaShoppingCart className="product-front-page-cart-icon" />}</button>
                </div>
                <div>
                    <button className="product-front-page-button" onClick = {()=>checkoutHandler(product_.price)}>Buy Now<FaHeart className='product-front-page-cart-icon'/></button>
                </div>
            </div>
        </div>
        <div className="product-description">
            <ProductDesc product={product_}/>
        </div>
    </div>
  )
}

export default ProductFrontPage