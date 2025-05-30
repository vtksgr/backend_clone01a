import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";



const app = express();

//app.use xai middleware ko lagi use hunxa
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true, limit: "16kb"}));
app.use(express.static("public"));//image files haru save garna lai

//secure cookie lai client ko brower ma store garna lai
app.use(cookieParser());

//routes import
import userRoutes from "./routes/user.routes.js";

//routes declaration .> user.routes.js 
//http://localhost:3000/api/v1/users/register  
app.use("/api/v1/users", userRoutes);


export default app