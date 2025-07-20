 import {Server} from "socket.io";
 import http from "http";
 import express from "express";
import { Socket } from "socket.io";
// import {io} from "socket.io-client"
 const app=express();
 const server=http.createServer(app);

 const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    },
    
 });

 io.on("Connection",(Socket)=>{
    console.log("A USer Connected ",Socket.id);

    Socket.on("disconnect",()=>{
    console.log("A USer DisConnected ",Socket.id);

    })
 })

 

 export {io,app,server};