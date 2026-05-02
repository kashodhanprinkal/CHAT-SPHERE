import express from "express"
import { 
  signup, 
  login, 
  logout, 
  updateProfile,
  forgotPassword,   
  resetPassword     
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

const router = express.Router();

// ✅ PUBLIC routes (no Arcjet)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

// ✅ Apply Arcjet ONLY after public routes
router.use(arcjetProtection);

// 🔐 PROTECTED routes
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, (req, res) => res.status(200).json(req.user));

// 🔥 THIS LINE WAS MISSING
export default router;