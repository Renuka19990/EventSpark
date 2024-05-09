const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { UserModel } = require("../Model/user.model");
require("dotenv").config();


const SignUp=async(req,res)=>{
    const {username,email,role,password,dateOfBirth,profilePicture,eventsBooked}=req.body;
    try{
        const user= await UserModel.findOne({email});
        if(user){
            return res.status(401).json({msg:"user is already registered ,please try to login"});
        }
        const allUser= await UserModel.find();
        let userId=0;
        if(allUser.length==0){
            userId=1;
        }else{
            userData= allUser[allUser.length-1];
            userId=userData.userId;
        }

        bcrypt.hash(password,10,async(err,data)=>{
            if(err) throw new Error(err);
            const dob = new Date(dateOfBirth);
            const age = Math.floor((new Date() - dob) / (365.25 * 24 * 60 * 60 * 1000));
            if(role){
                const newUser=new UserModel({userId,username,email,role,password:data,dateOfBirth,profilePicture,eventsBooked,age});
                await newUser.save();
            }else{
                const newUser=new UserModel({userId,username,email,password:data,dateOfBirth,profilePicture,eventsBooked,age});
                await newUser.save();
            }
            return res.status(201).json({msg:"User registered Successfully"})
        })
    }catch(error){
        console.log(error);
        res.status(400).json({msg:"Please provide correct details"})
    }
}

