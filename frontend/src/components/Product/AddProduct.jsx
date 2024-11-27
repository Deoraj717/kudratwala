import React, { useState } from 'react';
import './AddProduct.css';
import axios from 'axios';

const AddProduct = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    product_name: '',
    price: '',
    image: '',
    stock: '',
    description: '',
    area:'',
    tips:'',
    plant_type:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new FormData object to send files
    const formDataToSend = new FormData();
    
    // Append all the form fields to the FormData object
    formDataToSend.append('product_name', formData.product_name);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('stock', formData.stock);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('area', formData.area);
    formDataToSend.append('tips', formData.tips);
    formDataToSend.append('plant_type', formData.plant_type);
    
    // Append the image file
    formDataToSend.append('image', formData.image);
  
    try {
      console.log(formData);
      const res = await axios.post(`${backendUrl}/products/add`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',  // Set content type to handle file uploads
        },
        withCredentials:true
      });
      console.log('Form Data Submitted:', res.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form className="add-product-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="form-group">
        <label htmlFor="product_name">Product Name:</label>
        <input
          type="text"
          id="product_name"
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="images">Product Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          className="form-control file-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="stock">Stock Quantity:</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control textarea"
        />
      </div>
      <div className="form-group">
        <label htmlFor="plant-type">Product type:</label>
        <input
          type="text"
          id="plant_type"
          name="plant_type"
          value={formData.plant_type}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="plant area">Plant area:</label>
        <input
          type="text"
          id="plant_area"
          name="area"
          value={formData.area}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="plant tips">Plant tips:</label>
        <input
          type="text"
          id="plant tips"
          name="tips"
          value={formData.tips}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default AddProduct;
