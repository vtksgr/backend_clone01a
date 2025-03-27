import mongoose, {Schema} from "mongoose"; // {Shema leko reason xai destructure ko lagi ho}

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String,
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                reg: "Video"
            }
        ],
        password:{
            type: String,
            required: ['true', 'Password is required']
        },
        refreshToken:{
            type: String,
        },


    },
    {
        timestamps:true
    }
);




export const User = mongoose.model("User", userSchema)
