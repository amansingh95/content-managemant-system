const jwt=require('jsonwebtoken');
const config=require('config');
const { header } = require('express-validator');

module.exports=function(req, res, next){
    const token=req.header('token-no');
    //check if no token
    if(!token){
       return res.status(401).json({msg:"no token avaliable. Access Denied"});
    }
    // verify token
    try{
        const decode= jwt.verify(token,config.get('jwtSecret'));
        req.user=decode.user;
        next();
    }
    catch(err){
        return res.status(401).json({msg:"token not valid. Access Denied"});
    }
}