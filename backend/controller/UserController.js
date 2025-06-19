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

export const deleteUser = async(req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log("Error in deleting user", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}