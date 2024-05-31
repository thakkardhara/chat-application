

import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import genrateToken from "../utils/ValidateToken.js";



export const signupUser = async (req, res) => {
  try {
      const { fullname, username, password, confirmPassword, gender } = req.body;
      console.log("Received signup request:", req.body);

      if (password !== confirmPassword) {
          return res.status(400).json({ msg: "Password and confirm password do not match" });
      }

      const user = await User.findOne({ username });

      if (user) {
          return res.status(400).json({ error: "Username already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = new User({
          fullname,
          username,
          password: hashedPassword,
          gender,
          profilePic: gender === 'male' ? boyProfile : girlProfile
      });

      if (newUser) {
          await newUser.save();
          genrateToken(newUser._id, res);
          console.log("User saved with profilePic:", newUser.profilePic);

          res.status(201).json({
              _id: newUser._id,
              fullname: newUser.fullname,
              username: newUser.username,
              profilePic: newUser.profilePic,
              msg: "User created successfully",
          });
      } else {
          res.status(400).json({ error: "User not created" });
      }
  } catch (error) {
      console.log("Error in signup:", error.message);
      res.status(500).json({ error: "Internal server error" });
  }
};


export const loginUser = async (req, res) => {
  try {
    console.log("Login user");
    const { username, password } = req.body;
    const user = await User.findOne({username});
    const isPassword = await bcrypt.compare(password,user?.password || "");

    if(!user || !isPassword){
      return res.status(400).json({error:"Invalid credentials"});
    }
    genrateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
      profilePic: user.profilePic,
      msg: "User Loggedin successfully",
    });
  } catch (error) {
    console.log("Error in login:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutUser = async(req,res)=>{
  try {
    res.cookie("jwt","",{ maxAge:0}) // clear cookie
    res.status(200).json({message:"User logged out successfully"})
    console.log("Logout user")
  } catch (error) {
    console.log("Error in logout ", error.message);
    res.status(500).json({error:'Internal server error'})
  }
};
