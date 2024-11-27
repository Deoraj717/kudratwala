import React from 'react'
import ProductDescNav from './ProductDescNav'
import {Outlet} from 'react-router-dom';

function ProductDesc(product) {
  console.log(product);
  return (
    <div className='prod-desc-main'>
        <ProductDescNav/>
        <Outlet context={product}/>
    </div>
  )
}

export default ProductDesc