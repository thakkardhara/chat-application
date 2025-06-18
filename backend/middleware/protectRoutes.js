import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import { configDotenv } from 'dotenv';

const protectRoutes = async(req,res,next)=>{
    try {
        console.log("Cookies received:", req.cookies);
        const token = req.cookies.jwt;
        if(!token){
            console.log("❌ No token found in cookies");
            return res.status(401).json({error:"unauthorized- no token provided"})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
             console.log("✅ Decoded token:", decoded);
            return res.status(401).json({error:"unauthorized- no token provided"})
        }

        const user = await User.findById(decoded.userId).select("-password")
        if(!user){
             console.log("❌ User not found");
            return res.status(401).json({error:"User not found"})
            }

        req.user = user
        console.log("✅ User authenticated:", user.username);
        next()
  
    } catch (error) {
        res.status(500).json({error:"internal server error"})
        console.log("Error in middleware:" , error.message)
        
    }
}

export default protectRoutes;