import { createContext,useState } from "react";

export const userContext = createContext()

export const UserContextProvider = ({children})=>{
    const [login,setLogin] = useState(false)

    return (
        <userContext.Provider value = {{login,setLogin}}>
            {children}
        </userContext.Provider>
    )
}