import React from 'react'
import { Swiper,SwiperSlide } from 'swiper/react'
import { Navigation, Pagination,A11y } from 'swiper/modules';
import img1 from "/images/img1.jpg";
import img5 from "/images/img5.jpg";
import img4 from "/images/img4.jpg";
import img3 from "/images/img3.jpg";
import img2 from "/images/img2.jpg";
import './ImageSwipper.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
//get the size of images to be uploaded and just update the image container okay


function ImageSwipper() {
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
            <SwiperSlide>
                <img src = {img1}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src = {img2}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src = {img3}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src = {img4}/>
            </SwiperSlide>
            <SwiperSlide>
                <img src = {img5}/>
            </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default ImageSwipper