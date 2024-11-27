// ProductFilter.js
import React from 'react';
import './ProductFilter.css';

const ProductFilter = ({ filter, setFilter, view, setView }) => {
  const handleCategoryChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      category: e.target.value,
    }));
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value.split(',').map(Number);
    setFilter((prev) => ({
      ...prev,
      priceRange: value,
    }));
  };

  const handleViewChange = (e) => {
    setView(e.target.value);
  };

  return (
    <div className="filter">
      <div className="filter-controls">
        <label>
          Category:
          <select className='cat' value={filter.category} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Home Appliances">Home Appliances</option>
          </select>
        </label>
        <label>
          Price Range:
          <select className='price' value={filter.priceRange.join(',')} onChange={handlePriceRangeChange}>
            <option value={[0, 1000]}>All</option>
            <option value={[0, 100]}>0 - 100</option>
            <option value={[100, 500]}>100 - 500</option>
            <option value={[500, 1000]}>500 - 1000</option>
          </select>
        </label>
        {/* <label>
          View:
          <select className='view' value={view} onChange={handleViewChange}>
            <option value="grid">Grid</option>
            <option value="list">List</option>
          </select>
        </label> */}
      </div>
    </div>
  );
};

export default ProductFilter;
