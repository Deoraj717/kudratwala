// src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './searchbar.css'; // Add your styles here

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1); // Track the currently selected suggestion index
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length > 0) {
                try {
                    const res = await axios.get(`${backendUrl}/search?query=${query}`);
                    setSuggestions(res.data.data.products); // Adjust based on your API response structure
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                }
            } else {
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [query]);

    const handleChange = (e) => {
        setQuery(e.target.value);
        setSelectedIndex(-1); // Reset selected index on input change
    };

    const handleSuggestionClick = (product) => {
        setQuery(product.product_name); // Fill the search box with the selected suggestion
        setSuggestions([]); // Clear suggestions after selection
        navigate(`/products/${product._id}`); // Navigate to the selected product page
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) =>
                prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0) {
                handleSuggestionClick(suggestions[selectedIndex]); // Navigate to the product page
            } else {
                // Optionally, handle case where Enter is pressed without selecting a suggestion
                const productToNavigate = suggestions.find((_, index) => index === selectedIndex);
                if (productToNavigate) {
                    handleSuggestionClick(productToNavigate); // Navigate if any suggestion is highlighted
                }
            }
        } else if (e.key === 'Tab') {
            e.preventDefault(); // Prevent the default tab behavior
            if (selectedIndex >= 0) {
                handleSuggestionClick(suggestions[selectedIndex]); // Fill the search box and clear suggestions
            }
        }
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                placeholder="Search for products..."
                value={query}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="search-input"
            />
            <FaSearch className="search-icon" />
            {suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                    {suggestions.map((product, index) => (
                        <div
                            key={product._id}
                            className={`suggestion-item ${selectedIndex === index ? 'selected' : ''}`}
                            onClick={() => handleSuggestionClick(product)} // Navigate on suggestion click
                        >
                            {product.product_name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
