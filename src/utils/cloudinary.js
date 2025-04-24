// import {v2 as cloudinary} from cloudinary;// bracket vittra ko xai name change gareko matra ho.
import cloudinary from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY, 
    api_secret: process.env.CLOUDINARY_CLOUD_API_KEY_SECRET// Click 'View API Keys' above to copy your API secret
});


 const uploadOnCloudinary = async (localfilePath) => {
    try {
        if(!localfilePath) return null;
        // upload on cloudinary
        const response = await cloudinary.uploader.upload(
            localfilePath, {
                resource_type: "auto",
            });
            console.log("file is uploaded on cloudinary", response.url);
            return response
    } catch (error) {
        fs.unlinkSync(localfilePath);//remove the locally saved temporary file as the uplaod operation got failed
        console.log("file is not uploaded on cloudinary", error);
        return null
    }
 }

 export {uploadOnCloudinary};