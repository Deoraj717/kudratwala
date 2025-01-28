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
      setPage((old)=>old>0?old-1:0)
    }
    useEffect(()=>{
      const getProducts = async()=>{
        try{
          setLoading(true)
          const res = await axios.get(`${backendUrl}/products/getproducts`,{
            params:{
              page
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
    },[page]);

    const [filter, setFilter] = useState({
      category: 'All',
      priceRange: [0, 1000],
    });
    const [view, setView] = useState('grid'); // Added state for view type

    if(loading == true)return <h1>loading</h1>

    const filteredProducts = products.filter((product) => {
      const inCategory = filter.category === 'All' || product.category === filter.category;
      const inPriceRange = product.price >= filter.priceRange[0] && product.price <= filter.priceRange[1];
      return inCategory && inPriceRange;
    });
    return (
      <div className="product-page">
        <ProductFilter filter={filter} setFilter={setFilter} view={view} setView={setView} />
        <ProductList products={filteredProducts} view={view} />
        <button className='button-products' onClick = {nextpage}>next-Page</button>
        {page !=0 && <button className='button-products' onClick = {prevpage}>Prev Page</button>}
      </div>
    );
  };

  export default ProductPage;
