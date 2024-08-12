import { catchAsyncError } from "../middlewares/catchAsyncError.js";


const STREAM_KEY=process.env.STREAM_KEY || 'supersecret'

export const doStream=catchAsyncError(async(req,res,next)=>{
    const streamkey=req.body.key;
    if(streamkey===STREAM_KEY){
        res.status(200).send();
        return;
    }
    res.status(403).send();
})



