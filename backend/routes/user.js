const express=require('express')
const userRouter=express.Router()
const zod=require('zod')
const {User}=require('../db')
const jwt=require('jsonwebtoken')
const {JWT_SECRET}=require('../config')
const bcrypt=require('bcrypt')

const signupData=zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    userName:zod.string().email(),
    password:zod.string().min(6)
})

userRouter.post('/signup',async(req,res)=>{
    const {success}=signupData.safeParse(req.body)
    if(!success){
        return res.status(401).json({
            msg:"inavlid input format"
        })
    }
    const {firstName,lastName,userName,password}=req.body
    const existingUser=await User.findOne({userName})
    if(existingUser){
        return res.status(401).json({
            msg:"user with this email already exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const newUser=await User.create({
        firstName,
        lastName,
        userName,
        password: hashedPassword
    })
    const userId=newUser._id
    const token=jwt.sign({userId},JWT_SECRET)


    res.status(200).json({
        msg:"user signed up successfully",
        token:token
    })
})

const signinData=zod.object({
    userName:zod.string().email(),
    password:zod.string().min(6)
})

userRouter.post('/signin',async(req,res)=>{
    const {success}=signinData.safeParse(req.body)
    if(!success){
        return res.status(401).json({
            msg:"user signed in successfully"
        })
    }
    const {userName,password}=req.body
    const user=await User.findOne({
        userName
    })
    const ispasswordvalid=await bcrypt.compare(password,user.password)
    if(!ispasswordvalid){
        return res.status(401).json({
            msg:"no userfound with these credentials"
        })
    }
    const userId=user._id
    const token=jwt.sign({userId},JWT_SECRET)
    
    res.status(200).json({
        msg:"user signed in successfully",
        token:token
    })
})

userRouter.get('/profile', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            msg: "Token not found, invalid authentication, try signing in again."
        });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET);
        const userId = decoded.userId;

        const user = await User.findById(userId); // Assuming userId is the _id field in your User model

        if (!user) {
            return res.status(404).json({
                msg: "No user info found, try again."
            });
        }

        res.status(200).json({
            msg: "User's profile",
            fname:user.firstName,
            lname:user.lastName,
            userName:user.userName // You can customize what user details to return
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "An error occurred."
        });
    }
});



module.exports=userRouter