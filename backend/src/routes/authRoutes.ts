import express from "express";
import { oauthCallback } from "../controllers/authController";

const router = express.Router();

// oauth routes
router.post("/oauth/callback", oauthCallback); // Oauth Callback

export default router;
