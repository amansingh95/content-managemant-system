const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator/check');
const { findOne } = require('../../models/User');
const User=require('../../models/User');
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');


router.post('/', [
    check('email','please enter valid email').isEmail(),
    check('name','name is Required').not() .isEmpty(),
    check('password','minimum 5 letter is required').isLength({ min:5  })
],async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {name,email,password}=req.body; 
    try{
        let user=await User.findOne({email});
        if(user){
            return res.status(400).json({errors:[{msg:'user allready Exist'}]});
        }
        const avatar=gravatar.url('email',{
            s:'200',
            r:'pg',
            d:"mm"
        })
        user=new User({
            name,
            email,
            password,
            avatar
        });
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();
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