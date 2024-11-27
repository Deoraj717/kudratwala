import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaCopyright } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
            <div className="footer-main">
                <div className="about">
                    <h3 className='heading'>About</h3>
                    <ul className='about-list'>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Refund Policy</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="social-media">
                    <h3 className='heading'>Connect With Us</h3>
                    <ul className='media-icons'>
                        <li><FaFacebook className='footer-icons'/></li>
                        <li><AiFillInstagram className='footer-icons'/></li>
                        <li><FaTwitter className='footer-icons'/></li>
                    </ul>
                </div>
            </div>
        <h3>copyright<FaCopyright className='copyright'/> Naturewala</h3>
    </div>
  )
}

export default Footer