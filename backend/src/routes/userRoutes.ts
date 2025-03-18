import express from "express";
import { loginHandler, registerHandler, validateToken } from "../controllers/authController";
import { validateRegister } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", validateRegister, registerHandler); // User Registration
router.post("/login", loginHandler ); // User Registration
router.post("/validateToken", validateToken); // Validate Token

export default router;
