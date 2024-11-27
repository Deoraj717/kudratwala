import React from 'react'
import './cards.css'
import outdo from '/plant/outdoor.jpg'
import indo from '/plant/indoor.webp'
import accs from '/plant/accs.webp'
import fert from '/plant/fertilizer.jpg'
import seeds from '/plant/seeds.jpg'


const cards = () => {
  return (
    <div className="cards">
        <div>
            <div className='ball'>
            <img src={indo} alt="Logo" style={{ height: '80px'}}  /> 
            </div>
                <h4>   INDOOR</h4>
        </div>

        <div>
            <div className='ball'>
            <img src={outdo} alt="Logo" style={{ height: '80px'}}  /> 
            </div>
            <h4>OUTDOOR</h4>
        </div>

        <div>
            <div className='ball'>
            <img src={seeds} alt="Logo" style={{ height: '80px'}}  /> 
            </div>
            <h4>SEEDS</h4>
        </div>

        <div>
            <div className='ball'>
            <img src={fert} alt="Logo" style={{ height: '80px'}}  /> 
            </div>
            <h4>FERTILIZERS</h4>
        </div>

        <div>
            <div className='ball'>
            <img src={accs} alt="Logo" style={{ height: '80px'}}  /> 
            </div>
            <h4>ACCESSORIES</h4>
        </div>

    </div>
  )
}

export default cards