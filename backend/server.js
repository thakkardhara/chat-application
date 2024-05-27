import express from "express";
import dotenv from "dotenv";
import AuthRoutes from "../backend/routes/AuthRoutes.js";
import connectDB from "./db/Connect.js";


console.log("Environment Variables Loaded:");
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("PORT:", process.env.PORT);

const app = express();

const PORT = process.env.PORT || 5000;
process.env.MONGO_URI = "mongodb+srv://dharat:dharazignuts@cluster0.nzwwnye.mongodb.net/chat-app?retryWrites=true&w=majority&appName=Cluster0"
dotenv.config();
app.use(express.json())
connectDB();

app.get("/", (req, res) => {
    res.send("Hello World!!");
});

app.use("/api/auth", AuthRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
