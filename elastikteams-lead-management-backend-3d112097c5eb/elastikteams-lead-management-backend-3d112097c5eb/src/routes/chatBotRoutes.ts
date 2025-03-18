import express from "express";
import { getAIResponse } from "../middleware/chatbotController";

const router = express.Router();

// Define chatbot API endpoint
router.post("/", getAIResponse);

export default router;
