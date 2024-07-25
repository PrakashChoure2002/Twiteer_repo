const User = require("../models/usermodel");
const bcrypt=require('bcryptjs')
const {generateTokenAndSetCookie}=require('../utils/generateToken')

 const signup=async(req,res)=>{
    try {
        const {fullName,username,email,password}=req.body;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}

        const existinguser=await User.findOne({username})
        if(existinguser){
            
            return res.status(400).json({error:"user is alredy taken"})
        }
        const existinemail=await User.findOne({email})
        if(existinemail){
            return res.status(400).json({error:"email is alredy taken"})
        }

        if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}


        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)

        const newUser=new User({
            fullName,
            username,
            email,
            password:hashPassword

        })
        if(newUser){
            generateTokenAndSetCookie(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id:newUser.fullName,
                username:newUser.username,
                email:newUser.email,
                followers:newUser.followers,
                following:newUser.following,
                profileImg:newUser.profileImg,
                coverImg:newUser.coverImg,
            })
        }else{
            res.status(400).json({error:"Invalid user data"})
        }
        
        
    } catch (error) {
        console.log("error",error.message)
        res.status(500).json({error:"Internal server error"})

    }
}

const login=async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user=await User.findOne({username})
        const isPasswordCorrect=await bcrypt.compare(password,user?.password ||"")
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error :"invalid username or password"})
        }
        generateTokenAndSetCookie(user._id,res)
            
            res.status(201).json({
                _id:user.fullName,
                username:user.username,
                email:user.email,
                followers:user.followers,
                following:user.following,
                profileImg:user.profileImg,
                coverImg:user.coverImg,
            })
        
    } catch (error) {
        console.log("error",error.message)
        res.status(500).json({error:"Internal server error"})

        
    }
}

const logout=async(req,res)=>{
    try {
        res.cookie('jwt',"",{maxAge:0})
        res.status(200).json({error:"logout the successfully"})

        
    } catch (error) {
        console.log("error",error.message)
        res.status(500).json({error:"Internal server error"})
        
    }
}

const getMe = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select("-password");
		res.status(200).json(user);
	} catch (error) {
		console.log("Error in getMe controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


exports.signup=signup
exports.login=login
exports.logout=logout
exports.getMe=getMe