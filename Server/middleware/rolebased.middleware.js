const access=(...roles)=>{
    return (req,res,next)=>{
      const userRole=req.roles;
      const hasCommonRole = userRole.some(role => roles.includes(role));
      if(hasCommonRole){
        next();
      }else{
        res.status(403).json({error:"Access forbidden"});
      }
    }
}

module.exports={access}