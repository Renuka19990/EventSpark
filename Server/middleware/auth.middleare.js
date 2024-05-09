require("dotenv").config();
const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
   const token=req.headers["authorization"].split(" ")[1];
   if(!token){
    return res.status(401).json({msg:"token is not provided"});
   }
   jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
    if(err) throw new Error(err);
    if(decoded){
        req.userId=decoded._id;
        req.roles=[...decoded.role];
        next();
    }
   })
}

module.exports={auth};