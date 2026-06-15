import express from "express"
import { getAllContacts } from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js"
import { getMessageByUserId } from "../controllers/message.controller.js";
import { sendMessage } from "../controllers/message.controller.js";
import { getChatPartners } from "../controllers/message.controller.js";
import { getMessageStatus } from "../controllers/message.controller.js";
import { markMessagesAsDelivered } from "../controllers/message.controller.js";
import { markMessagesAsRead } from "../controllers/message.controller.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
import { sendVoiceMessage } from "../controllers/message.controller.js";
import { uploadVoice } from "../middleware/uploadVoice.js";

const router = express.Router();
router.use(arcjetProtection, protectRoute)

router.get("/contacts", getAllContacts)
router.get("/chats", getChatPartners)
router.get("/:id", getMessageByUserId)
router.post("/send/:id", sendMessage)
router.get("/status/:userId", getMessageStatus)
router.put("/delivered/:senderId", markMessagesAsDelivered)
router.put("/read/:senderId", markMessagesAsRead)
router.post("/voice/send/:id", uploadVoice.single("voice"), sendVoiceMessage)

export default router