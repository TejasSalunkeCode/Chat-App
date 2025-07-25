import { Server } from "socket.io";
import http from "http";
import express from "express";
// import { socket } from "socket.io";
import { log } from "console";
// import {io} from "socket.io-client"
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
   cors: {
      origin: ["http://localhost:5173"]
   },

});


export function getReceiverSocketId(userId){
   return userSocketMap[userId];
}


//used to store online users
const userSocketMap={};//{userId : socketId}



io.on("connection", (socket) => {
   console.log("A USer Connected ", socket.id);

   const userId=socket.handshake.query.userId;

   if(userId){
      userSocketMap[userId]=socket.id;
   }
   //io.emmit() is used to send events to all the connected clients
   io.emit("getOnlineUsers",Object.keys(userSocketMap));

   socket.on("disconnect", () => {
      console.log("A USer DisConnected ", socket.id);
      delete userSocketMap[userId];
      io.emit("getOnlineUsers",Object.keys(userSocketMap));
   });

})


export { io, app, server };

