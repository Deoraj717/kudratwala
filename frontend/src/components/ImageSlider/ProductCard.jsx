import { useState,useEffect, useContext} from 'react'
import axios from 'axios'
import { RiAddLargeLine } from "react-icons/ri";
import './ProductCard.css'
import { Swiper,SwiperSlide } from 'swiper/react'
import { Navigation, Pagination,A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-coverflow';
import { Link, NavLink,useNavigate  } from 'react-router-dom';

const ProductCard = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()
  const [products,setProducts] = useState([])
  const url = `${backendUrl}/products/getproducts`

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(url).then((res)=>{console.log(res.data.data);setProducts(res.data.data);});
        console.log(products);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);


  if(products.length==0){
    console.log("no Products");
    return <h1>No Product found</h1>;
  }


  const addToCart = (id) => {
    const url = `${backendUrl}/addtocart/${id}`;
    axios.post(url).then((res)=>{console.log(res)}).catch((err)=>{console.log(err)});
  };

  return (
    <div className="small-swiper-main-container">
      <Swiper
        navigation 
        className="small-swiper-container" 
        effect='coverflow' 
        slidesPerView="4" 
        spaceBetween={20} 
        modules={[Navigation, Pagination,A11y]}
        loop={false}
      >
        {products.map((product, index) => (
          <SwiperSlide key={index} className='small-singleslide'>
            <div className='small-slider-main-container'>
              <div className="small-img">
                <img src={product.image} alt="small-product-poster"/>
              </div>
              <Link to  = {`/products/${product._id}`} className="link">
              <div className="small-product-details-container">
                <div className="small-product-details-main-container">
                  <h2 className = "small-product-name">{product.name}</h2>
                  {/* <div className="small-product-buttons">
                    <button className='small-add-to-cart-button' onClick={()=>addToCart(product.id)}>
                      <RiAddLargeLine className='small-icon-watchlist' />
                    </button>
                  </div> */}
                  <div className='small-product-details'>
                  <div>
                    {/* <h3 className="small-product-rating">Rating {product.rating}</h3> */}
                    <h3 className="small-product-rating">{product.product_name}</h3>
                  </div>
                  </div>
                </div>
              </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductCard;