import React from 'react'
// import about from '/images/about.jpg'
import './About.css'

function About() {
  return (
    <div className='about-cont'>
        <h1>About Us</h1>
        <div className='about-us'>
            <div className="about-image">
                {/* <img src = {about}/> */}
            </div>
            <div className="about-content">
                Welcome to Kudratwala, your go-to destination for all things green and growing! Our journey began with a deep passion for nature and a desire to bring the joy of plants into every home. Whether you're a seasoned plant parent or just beginning your green adventure, we are here to provide you with the finest selection of indoor and outdoor plants.
                At Kudratwala, we believe in the power of plants to transform spaces, uplift moods, and promote a healthier, more sustainable lifestyle. Each plant is carefully selected and nurtured to ensure it arrives at your door in perfect health, ready to thrive in its new home.
                Our mission is to make plant care simple and accessible for everyone. With a variety of plants suited for every environment and expertise level, as well as detailed care instructions, we aim to support you on your plant journey from start to finish.
                Join us in growing a greener world, one plant at a time!
            </div>
        </div>
        <div className='about-details'>
            <h1>What we do</h1>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis porro 
            molestias animi quas eum tempore quae, necessitatibus minima recusandae, 
            fugiat quo laboriosam rerum. Sequi voluptates atque voluptas dolores doloremque incidunt.
        </div>
    </div>
  )
}

export default About