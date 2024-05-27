import jwt from "jsonwebtoken"

const genrateToken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:'30d'
    })

    res.cookie("jwt", token,{
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly:true, //to prevent cross site attcakes
        sameSite:"strict",
        
    })
}

export default genrateToken;
