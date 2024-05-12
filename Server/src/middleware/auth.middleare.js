require("dotenv").config();
const jwt=require("jsonwebtoken");
const { BlacklistModel } = require("../Model/blacklist.model");

const auth=async(req,res,next)=>{
    console.log("tc")
   const token=req.headers["authorization"].split(" ")[1];
   if(!token){
    return res.status(401).json({msg:"token is not provided"});
   }
   const blackList=await BlacklistModel.findOne({token});
   if(blackList){
      return res.status(401).json({msg:"user is already logout please login again"});
   }
   jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
    if(err) throw new Error(err);
    if(decoded){
        req.userID=decoded.userID;
        req.role=decoded.role;
        req.username=decoded.username;
        console.log("tc3")
        next();
    }
   })
}

module.exports={auth};