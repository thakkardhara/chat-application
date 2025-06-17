import { useState } from "react"
import toast from 'react-hot-toast'
import {useAuthContext} from '../context/AuthContext'
import Cookies from 'js-cookie'

const UseSignup = () => {
    const [loading,setLoading]= useState(false);
    const {setauthUser} = useAuthContext()

    const signup = async({fullname,username,password,confirmPassword,gender})=>{
     const success = handleInputErrors({fullname,username,password,confirmPassword,gender})
     if(!success) return;
    //  const token = Cookies.get("jwt");
     try {
        const res = await fetch('https://chat-application-nod4.onrender.com/api/auth/signup', {
            method: "POST",
            headers:{"content-type":"application/json",
                // "Authorization": `Bearer ${token}`
            },
            credentials: "include",
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


