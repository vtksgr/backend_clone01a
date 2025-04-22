import dotenv from "dotenv";
import connectDB from "./db/index.js"
import app  from "./app.js";
dotenv.config({
    path: "./env"
})


//db ko connection ma async use gareko vayera promise return dinxa tesaile ya then catch use gareko.
connectDB()
.then(() =>{//then mani callback hunxa
    app.listen(process.env.PORT || 3000, ()=>{//callback
        console.log(`Server is listen at port: ${process.env.PORT}`)
    })
})
.catch((err) =>{
    console.log("MONGO_DB CONNECTION FAILED !", err)
})
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