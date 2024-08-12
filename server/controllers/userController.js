import { catchAsyncError } from "../middlewares/catchAsyncError.js"
import { User } from "../models/UserModel.js"
import ErrorHandler from "../utils/errorHandler.js"
import { sendToken } from "../utils/sendToken.js"


export const register=catchAsyncError(async(req,res,next)=>{
const {name,email,password}=req.body
if(!name || !email || !password) return next(new ErrorHandler('Enter all fields',400))
    let user=await User.findOne({email})
if(user) return next(new ErrorHandler('User already exists',409))
    user=await User.create({
name,email,password})
sendToken(res,user,'Registered successfully',201)
})


export const login=catchAsyncError(async(req,res,next)=>{
const {email,password}=req.body
if(!email || !password) return next(new ErrorHandler('Enter all fields',400))
    const user=await User.findOne({email}).select('+password')
if(!user)return next(new ErrorHandler('Invalid email or password',401))
    const isMatch=await user.comparePassword(password)
if(!isMatch) return next(new ErrorHandler('Invalid email or password',401))
    sendToken(res,user,'Logged in Successfully',201)
})