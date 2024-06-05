
import { useState } from "react";
import toast from 'react-hot-toast';
import useConversation from "../zustand/UseConversation";

const UseSendMsg = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    const sendMsg = async (message) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!res.ok) {
                const errorData = await res.text();
                console.error('Error response:', errorData);
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            setMessages([...messages, data]);
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMsg, loading };
};

export default UseSendMsg;


