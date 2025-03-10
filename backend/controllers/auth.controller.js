import {User} from "../models/user.js";
import bycryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
export async function signup(req,res){
    try{
       const {email,password,username}=req.body;
       if(!email||!password||!username)
        {
            return res.status(400).json({success:false,message:"all fields are required"})
        } 
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email))
        {
            return res.status(400).json({success:false,message:"wrong email "})
        }
        if(password.length<6)
        {
            return res.status(400).json({success:false,message:"password should be greater than 6 characters!!"})
        }
        const existingUserByEmail=await User.findOne({email:email})
        if(existingUserByEmail)
        {
            return res.status(400).json({success:false,message:"email already exists!!"})
        }
        const existingUserByusername=await User.findOne({username:username})
        if(existingUserByusername)
        {
            return res.status(400).json({success:false,message:"Username already exists!!"})
        }

        const salt=await bycryptjs.genSalt(10);
        const hashedPassword=await bycryptjs.hash(password,salt);
        const PROFILE_PICS = ["/avatar1.png","/avatar2.png","/avatar3.png"];
        const image=PROFILE_PICS[Math.floor(Math.random()*PROFILE_PICS.length)];
        const newuser=new User({
            email,
            password:hashedPassword,
            username,
            image
        });

        
        generateTokenAndSetCookie(   newuser._id,res);
               
         await newuser.save();
        res.status(201).json({success:true,message:{...newuser._doc,password:"",
         }});
        
       
       
        
    }catch(error){
        console.log("error in signup controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});

    }
}
export async function login(req,res){
    try{
            const {email,password}=req.body;

            if(!email||!password)
            {
                return res.status(400).json({success:false,message:"all fields are required"})
            }
            const user=await User.findOne({email:email});
            if(!user)
            {
                return res.status(404).json({success:false,message:"Invalid Credentials"});
            }
            const ispasswordcorrect= await bycryptjs.compare(password,user.password);
            if(!ispasswordcorrect)
            {
                return res.status
                (400).json({success:false,message:"Invalid Credentials"});
            }
            generateTokenAndSetCookie(user._id,res);
            res.status(200).json({success:true,message:{...user._doc,password:""}});    
            }catch(error){
                console.log("error in login controller",error.message);
                res.status(500).json({success:false,message:"Internal server error"});  

    }
}
export async function logout(req,res){
    try{
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true,message:"logout successful"});
    }catch(error){
        console.log("error in logout controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
    res.send("logout route");
}


export async function authCheck(req,res){
    try{
        res.status(200).json({success:true,user:req.user});
    }catch(error){
        console.log("error in authCheck controller",error.message);
        res.status(500).json({success:false,message:"Internal server error"});
    }
}