import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"; //
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    //step 1. get the data from frontend.
    const { fullname, email, username, password } = req.body
    console.log("email: ", email);

    //step 2. velidation: email, username, password not empty
    if([
        fullname, email, username, password
    ].some((field) => field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }
    //step 3. check if user already exist: email, username
    const user = await User.findOne({
        $or: [
            {email: email},
            {username: username}
        ]
    })
    if(user){
        throw new ApiError(400, "User already exist")
    }

    //step 4. check for avatar
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    //step 5. check for coverImage
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    //step 6. upload to cloudinary, check avatar is uploaded or not
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatar) {
        throw new ApiError(400, "Avatar or coverImage is not uploaded")  
    }


    //step 7. create user object: create entry in database
    const newuser = await User.create({
        fullname,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    });

    //step 8. remove password and refresh token from response
    const createdUser = await User.findById(newuser._id).select("-password -refreshToken");

    //step 9. check for user is created or not
    if(!createdUser){
        throw new ApiError(500, "User is not created")
    }
    //step 10. return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User is registered successfully"));
    

});

export { registerUser };