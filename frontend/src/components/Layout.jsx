import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './sidebars/Sidebar.jsx';
import ImageSwipper from './ImageSlider/ImageSwipper.jsx'
import Header from './bars/Sidebar.jsx';
import Footer from './Footer/Footer.jsx'
import './sidebars/sidebar.css'
import './App.css'

function Home() {
  return (

    <div className="app">
        <Sidebar /> 
    <div className="main-content">
       <Header />
       <Outlet/>
       <Footer/>
  </div>
  </div>
   
  )
}

export default Home