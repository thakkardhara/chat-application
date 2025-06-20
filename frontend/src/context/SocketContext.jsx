import { createContext, useState , useEffect, useContext } from "react";
import {  useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

 const SocketContext = createContext();

export const useSocketContext = () =>{
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children})=>{
    const [socket,setSocket]= useState(null);
    const [onlineUsers,setOnlineUsers]= useState([])
    const {authUser} = useAuthContext();
    useEffect(()=>{
        if(authUser){
             console.log("SocketContext authUser:", authUser);
            const socket = io('https://chat-application-nod4.onrender.com', {
                query: { userId: authUser?._id }
            })  ;

            setSocket(socket);

            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            })


            return ()=> socket.close();
        }
        else{
            if(socket){
                socket.close();
                setSocket(null)
            }
        }

    },[authUser])



    return <SocketContext.Provider value={{ socket,onlineUsers }} >{children}</SocketContext.Provider>
}

export default SocketContext;

