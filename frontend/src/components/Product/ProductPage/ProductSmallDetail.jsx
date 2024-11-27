import React, { useContext } from 'react'
import { useOutletContext } from 'react-router-dom';

function ProductSmallDetail() {


    const {product} = useOutletContext();
    console.log(product);
    const description = "this is a beautiful plant";
    return (
        <div className='product-small-detail description'>{product.description}</div>
    )
}

export default ProductSmallDetail