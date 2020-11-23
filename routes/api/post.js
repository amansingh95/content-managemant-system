const express=require('express');
const router=express.Router();


router.get('/', (req,res)=>{res.send('thise is post page')});

module.exports=router;