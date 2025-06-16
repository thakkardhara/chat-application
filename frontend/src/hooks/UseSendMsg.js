import { useState, useContext } from "react";
import toast from 'react-hot-toast';
import useConversation from "../zustand/UseConversation";
import  SocketContext  from "../context/SocketContext"; // <-- import context

const UseSendMsg = () => {
    const [loading, setLoading] = useState(false);
    const { selectedConversation } = useConversation();
    const { socket } = useContext(SocketContext); // <-- get socket

    const sendMsg = async (message) => {
        setLoading(true);
        try {
            // Use different endpoint for group vs single
            const url = selectedConversation.isGroup
                ? `${import.meta.env.VITE_API_URL}/api/message/send/${selectedConversation._id}?isGroup=true`
                : `${import.meta.env.VITE_API_URL}/api/message/send/${selectedConversation._id}`;

            const res = await fetch(url, {
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

            // Emit newMessage event via socket
            if (socket && selectedConversation && !selectedConversation.isGroup) {
                socket.emit("newMessage", {
                    ...data,
                    receiverId: selectedConversation._id
                });
                console.log("Emitted newMessage via socket:", {
                    ...data,
                    receiverId: selectedConversation._id
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSend = () => {
        // ...message object banao...
        socket.emit("newMessage", newMessage);
        // setMessages() yahan mat karo!
    }

    return { sendMsg, loading };
};

export default UseSendMsg;


