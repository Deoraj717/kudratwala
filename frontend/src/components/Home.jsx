import React from 'react'
import ImageSwipper from './ImageSlider/ImageSwipper.jsx'
import Productcard from './ImageSlider/ProductCard.jsx';
import Cards from './cards/cards.jsx'
import Blog from './cards/blogs.jsx'
import Box from './cards/box.jsx'
import './App.css'
function Home() {
  return (
    <div className='main'>
       
        <ImageSwipper/>
        <Cards />
        <h1 className='ls'>Latest Products</h1>
        <Productcard/>
        <Box />
        <h1 className='bs'>Our Latest Blog</h1>
        <Blog/>
    </div>
  )
}

export default Home