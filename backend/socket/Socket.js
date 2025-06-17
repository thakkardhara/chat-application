import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
    console.log("userSocketMap:", userSocketMap); // Debug
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId && userId !== "undefined") {
		// Remove old mapping for this userId (if any)
		if (userSocketMap[userId]) {
			delete userSocketMap[userId];
		}
		// Remove any mapping where socket.id is already present (edge case)
		Object.keys(userSocketMap).forEach((key) => {
			if (userSocketMap[key] === socket.id) {
				delete userSocketMap[key];
			}
		});
		userSocketMap[userId] = socket.id;
		console.log(`User ${userId} mapped to socket ${socket.id}`);
	}

	const onlineUsers = Object.keys(userSocketMap);
	io.emit("getOnlineUsers", onlineUsers);
	console.log("Sent online users:", onlineUsers);

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		if (userId && userId !== "undefined") {
			delete userSocketMap[userId];
			const updatedOnlineUsers = Object.keys(userSocketMap);
			io.emit("getOnlineUsers", updatedOnlineUsers);
			console.log("Updated online users after disconnect:", updatedOnlineUsers);
		}
	});

	// Listen for incoming messages (optional, for debug)
	socket.on("newMessage", (data) => {
		const receiverSocketId = getReceiverSocketId(data.receiverId);
		console.log("receiverSocketId for", data.receiverId, "is", receiverSocketId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit("newMessage", data);
		}
		io.to(socket.id).emit("newMessage", data);
	});
});

export { app, io, server };


