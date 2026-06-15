import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    text: {
      type: String,
      trim: true,
      maxlength: 2000,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    // NEW
    messageType: {
      type: String,
      enum: ["text", "image", "voice"],
      default: "text",
    },

    // NEW
    voiceUrl: {
      type: String,
      default: "",
    },

    voiceDuration: {
      type: Number,
      default: 0,
    },
    
    deliveredAt : {
      type : Date,
      default: null
    },

    reatAt: {
      type : Date,
      default : null
    },

    status: {
      type: String ,
      enum:['sent','delivered','read'],
      default: 'sent'
    }
    
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;