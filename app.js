import express from "express";
// import mongoose from "mongoose";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
// // These below  one lines code are for development 
import cors from "cors";


export const app = express();
config({
    path: "./data/config.env",
})





// using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET", "POST", "PUT", "DELETE"],
    credentials: true,

}))

// using routes
app.use( "/api/v1/users", userRouter)
app.use( "/api/v1/task", taskRouter)






app.get("/", (req, res) => {
    res.send("Nice working")
});

// usig error Middleware
app.use(errorMiddleware);







