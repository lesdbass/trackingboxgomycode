const router=require("express").Router();
const User=require('../models/Users')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const {loginRules,validator} =require("../validator/validatorUsers")
const {isAuth} = require("../validator/isAuth")



router.post('/login',loginRules(),validator,async(req,res)=> {
    const {login , password}=req.body
try {
    
    let user = await User.findOne({login})
    if(!user){
        res.status(400).send({msg:"user does not exist"})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        res.status(400).send({mg:"Bad Credentials"})
    }

    const payload={id:user._id}

    const token = await jwt.sign(payload,process.env.mySecret,{expiresIn : '1h' })

    res.send({msg:"logged with success",user,token}).status(200)

} catch (error) {
    
}
})

router.get('/users',isAuth,(req,res)=> {


// router.get('/users',isAuth,(req,res)=>{
    res.status(200).send({user:req.user})
})


module.exports=router;