//require('dotenv').config({path: './env'}); [purano style ho]

import dotenv from "dotenv";
dotenv.config()
import connectDB from "./db/index.js"
import express from "express";
const app = express();




connectDB()
//efi
/*(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", ()=>{
            console.log("ERROR: ", error);
            throw error
        })
        app.listen(process.env.PORT, ()=>{
            console.log(`app is listning on port ${process.env.PORT}`)
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw error;
    }
})()
    */