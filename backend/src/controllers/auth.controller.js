import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup=async(req,res)=>{ };

export const login=async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user=await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isPasswordCorrect=await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        generateToken(user._id,res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
        });
    } catch (error) {
        console.log("Error in login Controller ",error.message);
        res.status(500).json({ message :"Internal Server Error"});
        
    }
};

export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({ message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller",error.message);
    }
}