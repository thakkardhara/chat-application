import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import dotenv from "dotenv";
import AuthRoutes from "../backend/routes/AuthRoutes.js";
import MessageRoutes from '../backend/routes/MessageRoutes.js';
import UserRoutes from '../backend/routes/UserRoutes.js';
import GroupRoutes from "../backend/routes/GroupRoutes.js";
import connectDB from "./db/Connect.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/Socket.js";
import cors from "cors";
// Load environment variables
dotenv.config();

console.log("Environment Variables Loaded:");
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);

// const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use JSON parser and cookie parser middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000", // ya aapka vercel domain
  credentials: true
}));

// Connect to the database
connectDB()
    .then(() => {
        console.log("Connected to MongoDB");

        // Start the server
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
    });

// Define routes
app.get("/", (req, res) => {
    res.send("Hello World!!");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/message", MessageRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/group", GroupRoutes);

//express.static is middleware
// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});