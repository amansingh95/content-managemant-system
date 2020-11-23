const express=require('express');
const router=express.Router();
const auth =require('../../middleware/auth');
const User=require('../../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');
const {check,validationResult}=require('express-validator/check');


router.get('/', auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json({user});
    }
   catch(err){
       res.status(500).send('server error');
       console.log(err.message);
   }
});

router.post('/', [
    check('email','please enter valid email').isEmail(),
    check('password','password required').exists()
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password}=req.body; 
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({errors:[{msg:'Invalid Email & Password'}]});
        }
        let ismatch= await bcrypt.compare(password,user.password);
        if(!ismatch){
            return res.status(400).json({errors:[{msg:'Invalid Email & Password'}]});
        }

        const payload={
            user:{
                id:user.id
            }
        };
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn:360000},
            (err,token)=>{
                if(err)throw err;
                res.json({token});
            }
        );
    }catch(err){
        console.log(err.message);
        res.status(500).send('server error');
    }
});

module.exports=router;