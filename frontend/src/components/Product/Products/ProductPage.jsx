// ProductPage.js
import React, { useState } from 'react';
import ProductList from './ProductList';
import ProductFilter from './ProductFilter';
import './ProductPage.css';

const productData = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1000, image: 'https://via.placeholder.com/250x150?text=Laptop' },
  { id: 2, name: 'T-shirt', category: 'Clothing', price: 20, image: 'https://via.placeholder.com/250x150?text=T-shirt' },
  { id: 3, name: 'Coffee Machine', category: 'Home Appliances', price: 150, image: 'https://via.placeholder.com/250x150?text=Coffee+Machine' },
  { id: 4, name: 'Headphones', category: 'Electronics', price: 100, image: 'https://via.placeholder.com/250x150?text=Headphones' },
  { id: 5, name: 'Shoes', category: 'Clothing', price: 50, image: 'https://via.placeholder.com/250x150?text=Shoes' },
];

const ProductPage = () => {
  const [products, setProducts] = useState(productData);
  const [filter, setFilter] = useState({
    category: 'All',
    priceRange: [0, 1000],
  });
  const [view, setView] = useState('grid'); // Added state for view type

  const filteredProducts = products.filter((product) => {
    const inCategory = filter.category === 'All' || product.category === filter.category;
    const inPriceRange = product.price >= filter.priceRange[0] && product.price <= filter.priceRange[1];
    return inCategory && inPriceRange;
  });

  return (
    <div className="product-page">
      <ProductFilter filter={filter} setFilter={setFilter} view={view} setView={setView} />
      <ProductList products={filteredProducts} view={view} />
    </div>
  );
};

export default ProductPage;
