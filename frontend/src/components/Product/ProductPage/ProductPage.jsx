import React from 'react'
import ProductFrontPage from './ProductFrontPage'
import Reviews from './Reviews'
import { Outlet } from 'react-router-dom'

function ProductPage() {
  return (
    <div>
        <div className="product-front-page">
          <ProductFrontPage/>
        </div>
        <Outlet/>
    </div>
  )
}

export default ProductPage