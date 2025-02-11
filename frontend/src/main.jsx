import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App.jsx'
// import ProductPage from './components/Product/ProductPage/ProductPage.jsx';
import ProductDesc from './components/Product/ProductPage/ProductDesc.jsx';
import Reviews from './components/Product/ProductPage/Reviews.jsx';
import AddProduct from './components/Product/AddProduct.jsx';
import Grow from './components/Product/ProductPage/Grow.jsx';
import ProductSmallDetail from './components/Product/ProductPage/ProductSmallDetail.jsx';
import Layout from './components/Layout.jsx';
import ProductFrontPage from './components/Product/ProductPage/ProductFrontPage.jsx';
import Cart from './components/Product/Cart.jsx';
import Login from './components/auth/Login.jsx';
import Home from './components/Home.jsx';
import Register from './components/auth/Register.jsx';
import ProductPage from './components/Product/Products/ProductPage.jsx';
import Seller from "./components/auth/Seller.jsx";
import About from './components/About/About.jsx';
import AuthPage from './components/auth/authPage.jsx'
import {ProductProvider} from './Context/ProductContext.jsx';
import ReviewPage from './components/Product/ProductPage/ReviewPage.jsx';
import Error from './components/Error.jsx';
import { UserContextProvider } from './Context/UserContext.jsx';
import Profile from './components/User/Profile.jsx';
import Update from './components/auth/Update.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element = {<Home/>}/>
      <Route path = "/sell" element = {<AddProduct/>}/>
      <Route path= "/auth" element={<AuthPage />} />
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/register" element = {<Register/>}/>
      <Route path = "/update" element = {<Update/>}/>
      <Route path = "/seller" element = {<Seller/>}/>
      <Route path = "/about" element = {<About/>}/>
      <Route path  = "/cart" element = {<Cart/>}/>
      <Route path = "/error" element = {<Error/>}/>
      <Route path = "/profile" element = {<Profile/>}/>
      {/* <Route path  = "/payments/paymentverification" element = {<CheckPayment/>}/> */}
      {/* <Route path ="/BlogData" element={<BlogData/>}/> */}
      <Route path = "/products" element = {<ProductPage/>}/>
      <Route path = "/products/:id" element = {<ProductFrontPage/>}>
          <Route index element = {<ProductSmallDetail/>}/>
          <Route path  = "review" element = {<Reviews/>}/>
          <Route path  = "grow" element = {<Grow/>}/>
          <Route path = "addreview" element = {<ReviewPage/>}/>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductProvider>
    <UserContextProvider>
    <RouterProvider router = {router}/>
    </UserContextProvider>
    </ProductProvider>
  </React.StrictMode>,
)
