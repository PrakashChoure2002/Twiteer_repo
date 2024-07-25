const User=require('../models/usermodel')
const jwt= require('jsonwebtoken')
require('dotenv').config()


 const protectRoute=async(req,res,next)=>{
   try {
    const token=req.cookies.jwt
    if(!token){
        return res.status(401).json({error:"Unauthorized : nO token is proived"})
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    if(!decode){
        return res.status(401).json({error:" Invalied token"})
    }
    const user=await User.findById(decode.userId).select("-password")

    if(!user){
        return res.status(404).json({error:"user not found"})
    }
    req.user=user
    next()
    
   } catch (error) {
    console.log("error in protected route",error.message)
    res.status(500).json({error:"Internal server error"})
    
   }
 }

 exports.protectRoute=protectRoute