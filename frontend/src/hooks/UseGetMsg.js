import toast from 'react-hot-toast';
import useConversation from "../zustand/UseConversation";
import { useEffect, useState } from 'react';

const UseGetMsg = () => {
    const [loading, setLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(()=>{
        const getMsg = async()=>{
            setLoading(true);
            try {
                const res = await fetch(`/api/message/${selectedConversation._id}`)
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
        if(selectedConversation?._id) getMsg()
    },[selectedConversation?._id,setMessages])
return{messages,loading}
}

export default UseGetMsg
