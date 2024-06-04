import { Server } from "socket.io";
import http from 'http';
import express from 'express'

const app = express();

//express server upar 1 socket server add karyu
const server = http.createServer(app);
const io = new Server(server,{
    cors:{
        origin:[" http://localhost:3000"],
        methods:["GET","POST"]
    }
})

export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}

    const userSocketMap = {}; //{userId:socketId}

io.on('connection',(socket)=>{
    console.log("a user connected", socket.id)

    const userId = socket.handshake.query.userId;
    if(userId != "undefined") userSocketMap[userId]= socket.id;

    io.emit("getOnlineUsers",Object.keys(underSocketMap)) //send events to all connected clients

    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(underSocketMap)) //send events to all connected clients


    })
})

export {app,io,server}