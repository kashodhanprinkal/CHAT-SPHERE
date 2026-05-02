import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required:true,
        unique:true,
    },
    fullName:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
        minlength :6
    },
    profilePic:{
        type : String,
        default:""
    },

    // 🔐 ADD THESE
    resetPasswordToken: String,
    resetPasswordExpire: Date,

},{
    timestamps: true
});

// 🔐 ADD THIS METHOD
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min

    return resetToken;
};

const User  = mongoose.model("User",userSchema);

export default User;