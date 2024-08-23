import React from 'react'
import './ProductDescNav.css';
import { NavLink } from 'react-router-dom';

function ProductDescNav() {
  return (
    <div>
        <ul className='product-desc-nav'>
            <li>
                <NavLink
                    to = "/Description"
                    className = {({isActive})=>isActive?"active-link":"link"}
                >

                    Description

                </NavLink>
            </li>
            <li>
                <NavLink
                    to = "/care"
                    className = {({isActive})=>isActive?"active-link":"link"}
                >

                    How to care

                </NavLink>
            </li>
            <li>
                <NavLink
                    to = "/faq"
                    className = {({isActive})=>isActive?"active-link":"link"}
                >

                    FAQ

                </NavLink>
            </li>
            <li>
                <NavLink
                    to = "/review"
                    className = {({isActive})=>isActive?"active-link":"link"}
                >

                    Reviews

                </NavLink>
            </li>
        </ul>
    </div>
  )
}

export default ProductDescNav