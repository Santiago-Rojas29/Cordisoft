import { createContext,useContext,useState,useEffect } from "react";

const AuthContext=createContext()

export function AuthProvider({children}){

    const[user,setUser]=useState(null)
    const[token,setToken]=useState(null)
    const[loading,setLoading]=useState(true)

    useEffect(()=>{
        const token=localStorage.getItem("token")
        const user=localStorage.getItem("user")

        if(token && user){
            setToken(token)
            setUser(JSON.parse(user))
        }

        setLoading(false);


    },[])

    const login=(userData,jwt)=>{
        localStorage.setItem("token",jwt)
        localStorage.setItem("user",JSON.stringify(userData))

        setToken(jwt)
        setUser(userData)

    }

    const logout=()=>{
        localStorage.clear()
        setToken(null)
        setUser(null)
    }

    return(
        <AuthContext.Provider value={{user,token,loading,login,logout}}>
            {children}
        </AuthContext.Provider>


    )

}
export const useAuth=()=>useContext(AuthContext)