import toast from 'react-hot-toast';
import useConversation from "../zustand/UseConversation";
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
const UseGetMsg = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(()=>{
        const getMsg = async()=>{
            setLoading(true);
            const token = Cookies.get("accessToken");
            try {
                if (!selectedConversation?._id) return;
                // Use different endpoint for group vs single
                const url = selectedConversation.isGroup
                

                         ? `https://chat-application-nod4.onrender.com/api/message/${selectedConversation._id}?isGroup=true`
                    : `https://chat-application-nod4.onrender.com/api/message/${selectedConversation._id}`;

                   const res = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
                const data = await res.json()
                if(data.error) throw new Error(data.error)
                setMessages(data)
            } catch (error) {
                console.error('Error sending message:', error);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getMsg()
    },[selectedConversation?._id, selectedConversation?.isGroup, setMessages])
    return{messages,loading}
}

export default UseGetMsg
