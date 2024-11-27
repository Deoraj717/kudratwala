import React from 'react';
import './box.css'
import Icon1 from '/box/icon-1.png'
import Icon2 from '/box/icon-2.png'
import Icon3 from '/box/icon-3.png'
import Icon4 from '/box/icon-4.png'
const Box = () => {
  return (
    <div className="icons-container">
      <div className="icons">
        <div className="icon">
          <img src={Icon1} alt="Free Delivery" />
          <div className="info">
            <h3>Free Delivery</h3>
            <span>On All Orders</span>
          </div>
        </div>

        <div className="icon">
          <img src={Icon2} alt="Reasonable Prices" />
          <div className="info">
            <h3>Reasonable Prices</h3>
            <span>On All Plants</span>
          </div>
        </div>

        <div className="icon">
          <img src={Icon3} alt="Discount & Offers" />
          <div className="info">
            <h3>Discount & Offers</h3>
            <span>On All Orders</span>
          </div>
        </div>

        <div className="icon">
          <img src={Icon4} alt="Secure Payment" />
          <div className="info">
            <h3>plants Care</h3>
            <span>All plants care </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Box;
