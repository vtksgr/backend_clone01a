import mongoose from "mongoose";
import  {DB_NAME} from "./constants";
import express from "express";
const app = express();

//efi
(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error", ()=>{
            console.log("ERROR: ", error);
        })
    } catch (error) {
        console.error("ERROR: ", error)
        throw error;
    }
})()