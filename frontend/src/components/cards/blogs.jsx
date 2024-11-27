import React from 'react';
import './blogs.css'
import Blog1 from '/blog/blog1.jpg'
import Blog2 from '/blog/blog2.jpg'
import Blog3 from '/blog/blog3.webp'

const Blogs = () => {
  return (
    <div>
      <div className="blog-title">
      
      </div>
      <div className="Blogs">
        <div className="blog">
          <div className="blog-img">
            <a href="/BlogData">
              <img src={Blog1} alt="Blog 1" />
            </a>
          </div>
          <div className="blog-content">
            <h6>10 August 2024 | Ajay</h6>
            <h5>
              <a href="/BlogData">
                Why we should be Thankful of every Single Tree?
              </a>
            </h5>
            <p>
              A single tree can take in an entire stadium worth of carbon
              dioxide from the air, reduces surrounding temperature up to 4
              degrees. 
            </p>
            <br />
            <a href="/BlogData">
             
            <button className="card-btn">Read more &rarr;</button>
            </a>
          </div>
        </div>

        <div className="blog">
          <div className="blog-img">
            <a href="/data">
              <img src={Blog2} alt="Blog 2" />
            </a>
          </div>
          <div className="blog-content">
            <h6>20 August 2021 | Rithik Swargam</h6>
            <h5>
              <a href="/BlogData">
                Here are Best Plant Gifts for upcoming Festive Season!
              </a>
            </h5>
            <p>
              In India, festivals happen every other day. It is a land of
              celebrations, where gifting is a norm and highly anticipated. If you don't
              have any.
            </p>
            <br />
            <a href="/BlogData">
              <button className="card-btn">Read more &rarr;</button>
            </a>
          </div>
        </div>

        <div className="blog">
          <div className="blog-img">
            <a href="/BlogData">
              <img src={Blog3} alt="Blog 3" />
            </a>
          </div>
          <div className="blog-content">
            <h6>30 August 2021 | Rithik Swargam</h6>
            <h5>
              <a href="/BlogData">
                Go eco-friendly this Ganesh Utsav!
              </a>
            </h5>
            <p>
              Every year with enormous apprehension we commemorate the festival
              of Ganesh Chaturthi. The celebration signifies the cycle of birth. Lord Ganesha.
            </p>
            <br />
            <br />
            <a href="/BlogData">
            <button className="card-btn">Read more &rarr;</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
