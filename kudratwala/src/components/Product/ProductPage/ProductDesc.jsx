import React from 'react'
import ProductDescNav from './ProductDescNav'
import {Outlet} from 'react-router-dom';

function ProductDesc() {
  return (
    <div>
        <ProductDescNav/>
        <Outlet/>
    </div>
  )
}

export default ProductDesc