import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

dotenv.config();
const app=express();


const PORT=process.env.PORT;


app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));+
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use("/api/messages",messageRoutes)
app.use("/api/auth",authRoute)

app.listen(PORT,()=>{
    console.log("server is running on port "+PORT);
    connectDB();
})

