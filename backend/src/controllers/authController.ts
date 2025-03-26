import { Request, Response } from "express";
import { loginUser, oauthService, registerUser, githubOAuthService } from "../services/authServices";
import logger from "../logger";

export const registerHandler = async (req: Request, res: Response) => {
    try {
        // console.log(req.body)
        const { name, email, password } = req.body;
        const user = await registerUser(name, email, password);
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: "An unknown error occurred" });
        }
    }
};


export const loginHandler = async (req: Request, res: Response) => {
    try {
        // console.log(req.body)
        const { email, password } = req.body;
        const { user, token, ...data } = await loginUser(email, password);

        const nextUrl = (req.query.next && typeof req.query.next === 'string')
            ? req.query.next
            : '/';

        res.status(data.success ? 200 : 400).json({ ...data, redirect: nextUrl, user, token });
    } catch (error: any) {
        // console.log(error.message);
        // console.log(error.message)
        logger.error(`Login failed Due to Error : ${error.message}`);
        res.status(500).json({ success: false, error: "Login Failed due to Internal Error", type: "other" });
    }
};


export const validateToken = (req: Request, res: Response) => {
    // if passed with check already logged in middleware then token is not valid because middleware will block requests for valid token for this route
    // so we can send success false means invalid token
    res.status(200).json({ success: false, message: "Invalid Token" });
};


export const oauthCallback = async (req: Request, res: Response) => {
  try {
    const { email, name, provider, image, code } = req.body;

    let jsonResp;

    if (provider === 'github') {
      jsonResp = await githubOAuthService(email, name);
    } else {
      jsonResp = await oauthService(email, name, provider, image);
    }

    // Create and assign a token
    res.status(200).json(jsonResp);

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Authentication failed'
    });
  }
};

export const githubOAuthSignIn = async (req: Request, res: Response) => {
    try {
        const clientId = process.env.GITHUB_CLIENT_ID;
        const redirectUri = `${process.env.FRONTEND_BASE_URL}/auth/callback/github`;
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;

        res.redirect(githubAuthUrl);
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'GitHub OAuth sign-in failed'
        });
    }
};
