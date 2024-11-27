// ProductList.js
import React from 'react';
import './ProductList.css';

const ProductList = ({ products, view }) => {
  return (
    <div className={`product-list ${view}`}>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product">
            <div className='product-ims'>
            <img src={product.image} alt={product.name} className="product-page-product-image" />
            </div>
            <div className="product-details">
              <h3>{product.product_name}</h3>
              <h4>Category: {product.plant_type}</h4>
              <h4>Price: ${product.price}</h4>
              <button className="add-to-cart">Add to Cart</button>
            </div>
          </div>
        ))
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
