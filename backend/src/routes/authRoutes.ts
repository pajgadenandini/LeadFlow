import express from "express";
import { oauthCallback } from "../controllers/authController";

const router = express.Router();

// oauth routes
router.post("/oauth/callback", oauthCallback); // Oauth Callback

// GitHub OAuth callback route
router.get("/oauth/github/callback", oauthCallback);

export default router;
