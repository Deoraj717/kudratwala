import { createContext,useState } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({children})=>{
    const [product_,setProduct_] =  useState({});

    return (
        <ProductContext.Provider value = {{product_,setProduct_}}>
            {children}
        </ProductContext.Provider>
    )
}