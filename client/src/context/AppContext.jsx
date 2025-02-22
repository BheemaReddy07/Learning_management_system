import { createContext, useState } from "react";




export const AppContext = createContext();

const AppContextProvider = (props) =>{
   
    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [showLogin, setShowLogin] = useState(false);

  const  value ={ token,setToken,backendurl,showLogin,setShowLogin}


    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}


export default AppContextProvider