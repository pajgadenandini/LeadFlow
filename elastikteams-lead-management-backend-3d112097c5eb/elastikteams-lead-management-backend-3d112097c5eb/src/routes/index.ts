import { Router } from "express";
import chatbotRoutes from "./chatBotRoutes";
import leadRoutes from "./leadRoutes";
import userRoutes from "./userRoutes";
import { authenticateJWT, checkAlreadyLoggedIn } from "../middleware/authMiddleware";
import activityRoutes from "./activityRoutes";
import leadDetailsRoutes from "./leadDetailsRoutes";
// import activityRoutes from "./activityRoutes";

const router = Router();

// TODO: After Creating Login functionality : Require logged in for all routes 
router.use("/users", checkAlreadyLoggedIn, userRoutes);

router.use("/chatbot",authenticateJWT, chatbotRoutes);// Use chatbot routes
router.use("/leads",authenticateJWT, leadRoutes);
router.use("/activity",authenticateJWT, activityRoutes);
router.use("/leadDetails",authenticateJWT, leadDetailsRoutes);

export default router;
