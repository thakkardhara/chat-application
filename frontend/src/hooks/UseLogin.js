import { useState } from "react"
import toast from 'react-hot-toast'
import {useAuthContext} from '../context/AuthContext'
const UseLogin = () => {
    const [loading,setLoading]= useState(false);
    const {setauthUser} = useAuthContext()

    const login = async({username,password})=>{
        const success = handleInputErrors({username,password})
        if(!success) return;
        setLoading(true)
        try {
            const res = await fetch('/api/auth/login',{
                method: "POST",
                headers:{"content-type":"application/json"},
                body: JSON.stringify({username,password})
            })
            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
              
            }

        //localstorage
        localStorage.setItem('chat-user',JSON.stringify(data));
        setauthUser(data);
        console.log("data",data)
            
        } catch (error) {
            toast.error(error.message)   
            
        }finally{
            setLoading(false)
        }

    }
    return {loading,login}
 
}

export default UseLogin


function handleInputErrors({username,password}){
    if( !username || !password ){
        toast.error("This didn't work.")
        return false
    }



    return true       
   

}