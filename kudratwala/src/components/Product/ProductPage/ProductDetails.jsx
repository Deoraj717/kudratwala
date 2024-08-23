import React from 'react'

function ProductDetails() {

    const desc = ["It comes with 2 seeds ","colour may vary"]

  return (
    <ul className='product-details-desc'>
        {desc.map((des)=>(
            <li>des</li>
        ))}
    </ul>
  )
}

export default ProductDetails