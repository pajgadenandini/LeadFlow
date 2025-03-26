import express from "express";
import { oauthCallback, githubOAuthSignIn } from "../controllers/authController";

const router = express.Router();

// oauth routes
router.post("/oauth/callback", oauthCallback); // Oauth Callback

// GitHub OAuth callback route
router.post("/oauth/github/callback", oauthCallback);

// GitHub OAuth sign-in route
router.post("/oauth/github", githubOAuthSignIn);

export default router;
