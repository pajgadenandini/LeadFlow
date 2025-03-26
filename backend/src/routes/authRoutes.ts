import express from "express";
import { oauthCallback } from "../controllers/authController";

const router = express.Router();

// oauth routes
router.post("/oauth/callback", oauthCallback); // Oauth Callback

// GitHub OAuth callback route
router.post("/oauth/github/callback", oauthCallback);

export default router;
