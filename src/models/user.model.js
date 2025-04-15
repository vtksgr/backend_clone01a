import mongoose, {Schema} from "mongoose"; // {Shema leko reason xai destructure ko lagi ho}
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

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
                ref: "Video"
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


//pre hook app.listen app.error sanga same same hunxa.
//purpose xai data save huni vanda agari password encrypt garauni.
// middle vako vayera next use gare ho flag lai age pass garna lai.
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
});

//hash password
userSchema.method.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
}

//generate token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generatefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User", userSchema)
