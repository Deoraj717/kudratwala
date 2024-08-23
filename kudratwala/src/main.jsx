import React from 'react'
import ReactDOM from 'react-dom/client'
import { Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import App from './App.jsx'
import ProductPage from './components/Product/ProductPage/ProductPage.jsx';
import ProductDesc from './components/Product/ProductPage/ProductDesc.jsx';
import Reviews from './components/Product/ProductPage/Reviews.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<h1><Outlet/></h1>}>
      <Route path = "products" element = {<h1><Outlet/></h1>}>
        <Route path = ":id" element = {<ProductPage/>}>
        </Route>
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router = {router}/>
  </React.StrictMode>,
)
