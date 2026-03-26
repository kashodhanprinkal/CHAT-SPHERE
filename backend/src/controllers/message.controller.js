import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js"

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error in getallcontacts:", error);
    res.status(500).json({ message: "server error" });
  }
};

export const getMessageByUserId = async (req,res)=>{
    try {
        const myId = req.user._id
        const { id : userToChatId }= req.params;

        const messags = await Message.find({
            $or:[
                { senderId: myId, receiverId: userToChatId},
                { senderId : userToChatId, receiverId: myId},
            ]
        });
        res.status(200).json(messags)
    } catch (error) {
        console.log("error in getMessages contoller:",error.message);
        res.status(500).json({error:"internal server error"})
    }
}

export const sendMessage=  async ( req,res)=>{
    try {
        const { text, image}= req.body;
        const { id:receiverId}= req.params;
        const senderId=req.user._id;

        let imageUrl;
        if (image){
            //upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl= uploadResponse.secure_url
        }
        const newMessage = new message ({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });
        await newMessage.save()
        // implement sen meaasge in rela time using socket io
        res.status(201).json(newMessage)

    } catch (error) {
        console.log("error in sendMessage contoller",error.message)
    }
}

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id.toString();

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId },
        { receiverId: loggedInUserId },
      ],
    });

    // ✅ Get unique partner IDs
    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    // ✅ Fetch users
    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");

    res.status(200).json(chatPartners);

  } catch (error) {
    console.log("error in getChatPartners:", error);
    res.status(500).json({ message: "server error" });
  }
};