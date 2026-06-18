import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  saveSubscription,
  removeSubscription,
  sendTestNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.use(protectRoute);

router.post("/subscribe", saveSubscription);
router.post("/unsubscribe", removeSubscription);
router.post("/test", sendTestNotification);

export default router;