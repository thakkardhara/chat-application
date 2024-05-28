import User from "../models/UserModel.js";

export const getUsers = async(req,res)=>{
    try {

        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ id:{$ne: loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers);
        
    } catch (error) {
        console.log("Error in getting all users", error.message)
        res.status(500).json({error:"Internal server error"})
        
    }
}