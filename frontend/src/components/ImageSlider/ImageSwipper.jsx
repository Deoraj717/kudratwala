import React, { useState,useEffect } from 'react'
import { Swiper,SwiperSlide } from 'swiper/react'
import { Navigation, Pagination,A11y } from 'swiper/modules';
import './ImageSwipper.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import { Link } from 'react-router-dom';
import axios from 'axios';
//get the size of images to be uploaded and just update the image container okay


function ImageSwipper() {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [products,setProducts] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${backendUrl}/products/getproducts`);
            const shuffledProducts = res.data.data.sort(() => 0.5 - Math.random());
            const randomProducts = shuffledProducts.slice(0, 4);
            setProducts(randomProducts);
            console.log(randomProducts);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    fetchProducts();  // Call the async function

}, []);

  const swiperSlides = products.map((product)=>{
    return (
        <SwiperSlide className = "slider-swiper">
          <Link to = {`products/${product._id}`}>
            <div className='slider-main-container'>
              <div className="image-swipper">
                <img src={`${product.image}`} alt="product"/>
              </div>
            </div>
            </Link>
        </SwiperSlide>
    )
  })

  if(loading)return <h1>Loading...</h1>

  return (
    <div className = "image-slider-container">
        <Swiper 
            navigation 
            className="swiper-container" 
            effect='coverflow' 
            slidesPerView={1}  
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination,A11y]}
            loop={true}
            >
            {swiperSlides}
        </Swiper>
    </div>
  )
}

export default ImageSwipper