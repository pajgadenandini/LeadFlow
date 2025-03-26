import express from "express";
import { oauthCallback, githubOAuthSignIn, githubOAuthCallback } from "../controllers/authController";

const router = express.Router();

// oauth routes
router.post("/oauth/callback", oauthCallback); // Oauth Callback

// GitHub OAuth sign-in route
router.post("/oauth/github", githubOAuthCallback);


export default router;
