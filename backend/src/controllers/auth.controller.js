
import User from "../models/User.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail, sendResetEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import crypto from "crypto";

export const signup = async (req,res)=>{
    const { fullName, email, password, profilePic } =req.body
    try {
        if (!fullName || !email || !password
        ){
            return res.status(400).json({message:"all feilds are required"})
        }

        if(password.length < 6){
            return res.status(400).json({message:"password must be of six charaters"})
        }

        // check if the email is valid : regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }

    const user = await User.findOne({email});
    if(user) return res.status(400).json({message:"email is already exists"})
   
        // hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
   
    const newUser = new User ({
        fullName,
        email,
        password: hashPassword
    })

    if(newUser){

       // generateToken(newUser._id, res)
        // await newUser.save();

        //persist user first, then issue auth cookie
        const savedUser = await newUser.save();
        generateToken(savedUser._id,res);

        res.status(201).json({
            _id:newUser._id,
            fullName : newUser.fullName,
            email: newUser.email,
            profilePic : newUser.profilePic,
        });

        // to do send a welcome email
// to do send a welcome email
try {
    console.log("Attempting to send welcome email to:", savedUser.email);

    await sendWelcomeEmail(
        savedUser.email,
        savedUser.fullName,
        process.env.CLIENT_URL
    );

} catch (error) {
    console.error("Error sending welcome email:", error);
}

    }else{
        res.status(400).json({message:"invalid user data"});
    }
    } catch (error) {
        console.log("error in signup controller", error)
        res.status(500).json({message:"internal server error"})
    }
}

export const login = async (req,res)=>{
const {email, password} = req.body

 if (!email || !password){
    return res.status(400).json({message:"email and password are"})
}

try {
    const user= await User.findOne({email})
    if(!user) return res.status(400).json({message:"invalid credentials"})

        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        console.log("Entered password:", password);
console.log("Stored password:", user.password);
console.log("Match:", isPasswordCorrect);
        if(!isPasswordCorrect) return res.status(400).json({message:"invalid credentials"})

        generateToken (user._id,res)

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic: user.profilePic,
        })
} catch (error) {
    console.error("error in login controller:",error)
    res.status(500).json({message:"internal server error"})
}
}

export const logout = (_, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};

// controllers/auth.controller.js

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, bio, profilePic } = req.body;
    
    console.log("📝 Updating profile for user:", userId);
    console.log("📊 Data received:", { fullName, bio, hasProfilePic: !!profilePic });
    
    // ✅ Build update object with only provided fields
    const updateData = {};
    
    // Add text fields if provided
    if (fullName !== undefined && fullName !== null) {
      updateData.fullName = fullName;
    }
    if (bio !== undefined && bio !== null) {
      updateData.bio = bio;
    }
    
    // Handle profile picture if provided
    if (profilePic) {
      console.log("📸 Uploading profile picture...");
      const uploadResponse = await cloudinary.uploader.upload(profilePic, {
        folder: "profile_pics",
        public_id: `user_${userId}`,
        overwrite: true,
        transformation: [
          { width: 400, height: 400, crop: 'fill' },
          { quality: 'auto' }
        ]
      });
      updateData.profilePic = uploadResponse.secure_url;
      console.log("✅ Profile picture uploaded:", uploadResponse.secure_url);
    }
    
    // ✅ Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ 
        message: "No data provided to update" 
      });
    }
    
    console.log("📝 Updating user with:", updateData);
    
    // ✅ Update user with all fields
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");
    
    console.log("✅ User updated successfully:", updatedUser);
    
    res.status(200).json(updatedUser);
    
  } catch (error) {
    console.error("❌ Error in updateProfile:", error.message);
    res.status(500).json({ 
      message: "Internal server error",
      error: error.message 
    });
  }
};

// ================= FORGOT PASSWORD =================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    // ✅ FIXED: Only pass email and resetUrl (2 arguments)
    await sendResetEmail(user.email, resetUrl);

    res.status(200).json({
      message: "Reset link sent to your email"
    });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================= RESET PASSWORD =================
export const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;

    // 🔐 Hash token from URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // 🔎 Find user with valid token + not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Token invalid or expired",
      });
    }

    // 🔒 Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔄 Update password
    user.password = hashedPassword;

    // 🧹 Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });

  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};