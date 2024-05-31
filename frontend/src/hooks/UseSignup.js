import { useState } from "react"
import toast from 'react-hot-toast'
import {useAuthContext} from '../context/AuthContext'

const UseSignup = () => {
    const [loading,setLoading]= useState(false);
    const {setauthUser} = useAuthContext()

    const signup = async({fullname,username,password,confirmPassword,gender})=>{
     const success = handleInputErrors({fullname,username,password,confirmPassword,gender})
     if(!success) return;
     try {
        const res = await fetch('/api/auth/signup',{
            method: "POST",
            headers:{"content-type":"application/json"},
            body: JSON.stringify({fullname,username,password,confirmPassword,gender})
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
     } finally{
        setLoading(false);
     }

    }



    return {loading,signup}
}

export default UseSignup


function handleInputErrors({fullname,username,password,confirmPassword,gender}){
    if(!fullname || !username || !password || !confirmPassword || !gender){
        toast.error("This didn't work.")
        return false
    }

    if(password !== confirmPassword){
        toast.error("Password didn't match.")
        return false
    }
    if(password.length < 6){
        toast.error("Password must be at least 6 characters.")
        return false
    }
    return true       
   

}


