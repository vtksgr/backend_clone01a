import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//app.use xai middleware ko lagi use hunxa
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

export {app}