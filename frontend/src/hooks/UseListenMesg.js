import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/UseConversation"
import notificationSound from '../assets/sounds/notification.mp3'

const UseListenMesg = () => {

    const {socket} = useSocketContext()
    const {messages,setMessages}= useConversation();

    useEffect (()=>{
        socket?.on("newMessgae",(newMessage)=>{
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound)
            sound.play();
            setMessages([...messages,newMessage])
        })
        return()=> socket?.off("newMwssage")

    },[socket,setMessages,messages])


}

export default UseListenMesg
