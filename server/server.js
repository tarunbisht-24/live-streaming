import express from 'express';
import client from 'prom-client'  
import responseTime from 'response-time';
import http from 'http';
import logger from './utils/logger.js';
import configureSocket from './utils/socket.js';
import dotenv from 'dotenv';
import {connectDB} from './config/Database.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';


dotenv.config({
    path:'./config.env'
})

connectDB()

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors())

app.use((req,res,next)=>{
logger.info(`${req.method} ${req.url}`)
next()
})

const server=http.createServer(app)
configureSocket(server);


const collectDefaultMetrics=client.collectDefaultMetrics
collectDefaultMetrics({register:client.register})

const httpRequestDuration=new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests',
    labelNames: ['method', 'route', 'statusCode'],
    buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
})

app.use(responseTime((req,res,time)=>{
    httpRequestDuration.labels({
        method:req.method,
        route:req.url,
        statusCode:req.statusCode
    }).observe(time)
}))

app.get('/metrics',async(req,res)=>{
    res.setHeader('Content-Type',client.register.contentType)
    const metrics=await client.register.metrics()
    res.send(metrics)
})

import user from './routes/userRoutes.js'
import stream from './routes/streamRoutes.js'

app.use('/api/v1',user)
app.use('/api/v1',stream)

const PORT=process.env.PORT || 4000

server.listen(PORT,()=>{
    console.log("Server is running on port PORT");
});