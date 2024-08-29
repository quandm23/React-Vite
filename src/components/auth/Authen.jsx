import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthWrapper = (props)=>{
    const [user,setUser] = useState({
    });

    const [loading,setLoading] = useState(false);
    return (
        <AuthContext.Provider value={{user, setUser,loading,setLoading }}>
            {props.children}
        </AuthContext.Provider>
    )

}