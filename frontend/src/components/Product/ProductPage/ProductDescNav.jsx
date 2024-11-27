import React from 'react'
import './ProductDescNav.css';
import { NavLink } from 'react-router-dom';

function ProductDescNav({product}) {
  return (
    <div>
        <ul className='product-desc-nav'>
            <li>
                <NavLink
                    to = ""
                    end
                    className = {({isActive})=>isActive?"active-link":"link"}
                >
                    Description
                </NavLink>
            </li>
            <li>
                <NavLink
                    to = "grow"
                    className = {({isActive})=>isActive?"active-link":"link"}
                >
                    How to Grow
                </NavLink>
            </li>
            <li>
                <NavLink
                    to = "review"
                    className = {({isActive})=>isActive?"active-link":"link"}
                >
                    Reviews
                </NavLink>
            </li>
            <li>
                <NavLink
                    to = "addreview"
                    className = {({isActive})=>isActive?"active-link":"link"}
                >
                    Add Review
                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default ProductDescNav