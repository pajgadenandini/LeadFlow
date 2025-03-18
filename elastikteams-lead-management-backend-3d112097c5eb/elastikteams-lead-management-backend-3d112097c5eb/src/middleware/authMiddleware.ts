import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_SECRET } from "../env";
import UserModel from "../models/userModel";
import { registerSchema } from "../utils/authValidations";

dotenv.config();

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization")?.split(" ")[1];
    // console.log(req.header("Authorization"))

    if (!token) {
        // console.log(req)
        // Send response and stop further execution, no return needed here
        res.status(401).json({ redirect: "/login", message: "Access denied. Please Log In First." });
        return; // Just use return to end the function here
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number, object?:any }; // Decode the token
        req.user = decoded; // Attach decoded user to the request object
        // console.log(req.user)
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        // Send response and stop further execution
        res.status(403).json({ redirect: "/login", message: "Invalid token." });
    }
};


export const checkAlreadyLoggedIn = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
        try {
            const token = req.header("Authorization")?.split(" ")[1];
            // if token is not there -> not logged in 
            if (!token) {
                return next();
            }
            // verify token and get user
            const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

            // make sure token is of same user
            const user = await UserModel.findByPk(decoded.id, { attributes: { exclude: ['password'] } });
            // if user not found -> not logged in
            if (!user) {
                return next();
            }
            // if user found -> logged in
            const nextUrl = (req.query.next && typeof req.query.next === 'string')
                ? req.query.next
                : '/';

            return res.status(200).json({ success: true, redirect: nextUrl, message: "User already logged in", user });
        } catch (error) {
            return next();
        }
    })().catch(next);
};

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });

    if (error) {
        res.status(400).json({ errors: error.details.map((err) => err.message) });
        return;
    }

    next();
};