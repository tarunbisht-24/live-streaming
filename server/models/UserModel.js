import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import {z} from 'zod'	
import bcrypt from 'bcrypt'


export const signUpSchema=z.object({
    name:z
    .string({required_error:'Name is required'})
    .trim()
    .min(3,{message:'must be three letters or more'}),

    email:z
    .string({required_error:'Email is required'})
    .email({message:'Invalid email'}),

    password:z
    .string({required_error:'Password is required'})
    .min(6,{message:'must be six letters or more'})
})


export const validate=(schema)=>async (req,res,next)=>{
try {
    const parsedBody=await schema.parseAsync(req.body)
    req.body=parsedBody
    next()
} catch (error) {
    const message=error.errors[0].message
    res.status(400).json({msg:message})
}
}


const schema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Enter name"],
    },
    email:{
        type:String,
        required:[true,"Enter email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Enter password"],
        minLength:[6,"Must be 6 letters or more"],
        select:false,
    },
})

schema.pre('save',async function(next){
    if(!this.isModified('password')) return next()
        this.password=await bcrypt.hash(this.password,10)
    next()
})

schema.methods.getJWTToken=function(){
    return jwt.sign(
        {_id:this._id},
        process.env.JWT_SECRET,
        {expiresIn:"15d"}
    )
}

schema.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

export const User=mongoose.model('User',schema)