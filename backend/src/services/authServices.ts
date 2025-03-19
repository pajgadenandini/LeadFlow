import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/userModel";
import logger from "../logger";
import { JWT_SECRET, SESSION_TIMEOUT } from "../env";

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