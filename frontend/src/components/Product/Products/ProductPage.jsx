  // ProductPage.js
  import React, { useState,useEffect, useRef } from 'react';
  import ProductList from './ProductList';
  import ProductFilter from './ProductFilter';
  import './ProductPage.css';
  import axios from 'axios';

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(0);

    const nextpage = ()=>{
      setPage((old)=> old+1);
    }
    const prevpage = ()=>{
      setPage((old)=>old>0?old-1:0);
    }

    const [filter, setFilter] = useState({
      category: 'All',
      priceRange: [0, 1000],
    });
    useEffect(()=>{
      const getProducts = async()=>{
        try{
          setLoading(true)
          const res = await axios.get(`${backendUrl}/products/getproducts`,{
            params:{
              page,filter
            }
          });
          console.log(res);
          setProducts(res.data.data);
          setLoading(false);
        }catch(err){
          console.log(err);
        }
      }
      getProducts();
    },[page,filter]);

    if(loading == true)return <h1>loading</h1>
    return (
      <div className="product-page">
        <ProductFilter filter={filter} setFilter={setFilter} setPage = {setPage}/>
        <div className = "product-catalogue">{products.map((product)=>{return <ProductList product = {product}/>})}</div>
        <button className='button-products' onClick = {nextpage}>next-Page</button>
        {page !=0 && <button className='button-products' onClick = {prevpage}>Prev Page</button>}
      </div>
    );
  };

  export default ProductPage;
