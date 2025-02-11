// ProductFilter.js
import React from 'react';
import './ProductFilter.css';

const ProductFilter = ({ filter, setFilter, setPage}) => {
  const handleCategoryChange = (e) => {
    setFilter((prev) => ({
      ...prev,
      category: e.target.value,
    }));
    setPage(0);
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value.split(',').map(Number);
    setFilter((prev) => ({
      ...prev,
      priceRange: value,
    }));
    setPage(0);
  };

  return (
    <div className="filter">
        <label>
          Category:
          <select className='cat' value={filter.category} onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="herb">Herbs</option>
            <option value="flower">Flowers</option>
            <option value="leaves">Leaves</option>
            <option value="indoor">indoor</option>
            <option value="outdoor">outdoor</option>
            <option value="seed">seeds</option>
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
    </div>
  );
};

export default ProductFilter;
