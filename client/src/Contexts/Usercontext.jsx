import { createContext, useEffect, useState } from "react";
import axios from 'axios';
export const userContext=createContext();

export default function UserState({children}){
    const [user,setUser]=useState(null);
    const [ready,setReady]=useState(false);
    useEffect(()=>{
        if(!user){
            axios.get("/profile").then(({data})=>{
                setUser(data);
                setReady(true); 
            });
        }
    },[])
    return(
        <userContext.Provider value={{user,setUser,ready}}>
            {children}
        </userContext.Provider>
    )
}