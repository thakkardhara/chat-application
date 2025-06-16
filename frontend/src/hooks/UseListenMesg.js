import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext"
import useConversation from "../zustand/UseConversation"
import notificationSound from '../assets/sounds/notification.mp3'

const UseListenMesg = () => {
    const { socket } = useSocketContext();
    const { addMessage } = useConversation(); // <-- yahan change

    useEffect(() => {
        if (!socket) return;
        const handler = (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            addMessage(newMessage); // <-- yahan change
        };
        socket.on("newMessage", handler);
        return () => socket.off("newMessage", handler);
    }, [socket, addMessage]);
}

export default UseListenMesg;
