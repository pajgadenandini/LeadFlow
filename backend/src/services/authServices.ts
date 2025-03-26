import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/userModel";
import logger from "../logger";
import { JWT_SECRET, SESSION_TIMEOUT } from "../env";
import axios from 'axios';

dotenv.config();

export const registerUser = async (
    name: string,
    email: string,
    password: string
) => {
    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ where: { email } });
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user in the database
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword,
        });

        // removing password before sending response
        const { password: _, ...userWithoutPassword } = newUser;

        return userWithoutPassword;
    } catch (error) {
        logger.error(`Registration failed: ${error}`);
        if (error instanceof Error) {
            throw new Error(`Registration failed: ${error.message}`);
        } else {
            throw new Error(`Internal server error`);
        }
    }
};

export const loginUser = async (email: string, password: string) => {
    // Check if the user exists
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
        return { success: false, error: "User not found", type: "email" };
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return { success: false, error: "Invalid password", type: "password" };
    }

    // Create and assign a token
    const token = jwt.sign({ id: user.id }, JWT_SECRET,
        { expiresIn: SESSION_TIMEOUT }
    );

    // removing password before sending response
    const { password: _, ...userWithoutPassword } = user.dataValues;

    return { success: true, message: "Login Successful", user: userWithoutPassword, token };
}

export const oauthService = async (email: string, name: string, provider?: string, image?: string) => {

    let user = await UserModel.findOne({ where: { email } });

    if (!user) {
        // Create new user if doesn't exist
        user = await UserModel.create({
            email,
            name
        });
    }

    // Create and assign a token
    const token = jwt.sign({ id: user.id }, JWT_SECRET,
        { expiresIn: SESSION_TIMEOUT }
    );

    // removing password before sending response
    const { password: _, ...userWithoutPassword } = user.dataValues;

    return { success: true, message: "Login Successful", user: userWithoutPassword, token };
}

export const githubOAuthServiceold = async (email: string, name: string) => {
    let user = await UserModel.findOne({ where: { email } });

    if (!user) {
        // Create new user if doesn't exist
        user = await UserModel.create({
            email,
            name
        });
    }

    // Create and assign a token
    const token = jwt.sign({ id: user.id }, JWT_SECRET,
        { expiresIn: SESSION_TIMEOUT }
    );

    // removing password before sending response
    const { password: _, ...userWithoutPassword } = user.dataValues;

    return { success: true, message: "Login Successful", user: userWithoutPassword, token };
};


export const githubOAuthService = async (code: string) => {
    try {
        // Step 1: Exchange code for access token
        const tokenResponse = await axios.post(
            'https://github.com/login/oauth/access_token',
            {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code
            },
            {
                headers: { 
                    Accept: 'application/json'
                }
            }
        );

        logger.info('GitHub OAuth token response:', tokenResponse);

        if (!tokenResponse.data.access_token) {
            throw new Error('Failed to get access token from GitHub');
        }

        const accessToken = tokenResponse.data.access_token;
        console.log('Access Token:', accessToken);

        // Step 2: Get user data
        const userResponse = await axios.get('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        });


        // Step 3: Get user emails
        const emailResponse = await axios.get('https://api.github.com/user/emails', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/json'
            }
        });

        const primaryEmail = emailResponse.data.find((email: any) => email.primary)?.email;

        logger.info('GitHub OAuth user response:', userResponse.data);
        logger.info('GitHub OAuth email response:', emailResponse.data);

        if (!primaryEmail) {
            throw new Error('No primary email found');
        }

        // Step 4: Find or create user
        let user = await UserModel.findOne({ where: { email: primaryEmail } });

        if (!user) {
            user = await UserModel.create({
                email: primaryEmail,
                name: userResponse.data.name || userResponse.data.login,
                provider: 'github',
                image: userResponse.data.avatar_url
            });
        }

        // Step 5: Generate JWT token
        const token = jwt.sign(
            { id: user.id }, 
            JWT_SECRET,
            { expiresIn: SESSION_TIMEOUT }
        );

        const { password: _, ...userWithoutPassword } = user.dataValues;

        return {
            success: true,
            message: "GitHub Login Successful",
            user: userWithoutPassword,
            token
        };

    } catch (error: any) {
        console.error('GitHub OAuth error:', error);
        
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }

        throw new Error(error.message || 'GitHub authentication failed');
    }
};