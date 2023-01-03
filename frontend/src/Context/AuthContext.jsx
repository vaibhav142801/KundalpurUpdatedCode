
import { createContext, useContext, useState } from "react";

import { useJwt } from "react-jwt";
import sessionStorage from "redux-persist/es/storage/session";

export const AuthContext = createContext(null);


export default function ProtectedProvider({children}) {

    const [isChecked, setChecked] = useState(false)
    const [user,setUser] = useState(null);
    const [verify,setVerify] = useState(null);

    const verifyUser = ()=>{
        let token = user || sessionStorage.getItem('token')
        console.log(token,'token')
        if (token){
            const { decodedToken, isExpired } = useJwt(token);
            console.log(decodedToken,"loggined user")
            if(decodedToken){
                setVerify(true)
                return
            }
        }
    }

    return <AuthContext.Provider value={{isChecked,setChecked,user,setUser,verifyUser,verify,setVerify}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext)
}