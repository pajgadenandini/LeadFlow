import dotenv from "dotenv";

dotenv.config();

export const PORT: number = parseInt(process.env.PORT as string) || 5000;
export const NODE_ENV: string = process.env.NODE_ENV || "development";
export const SESSION_TIMEOUT: number = parseInt(process.env.SESSION_TIMEOUT as string) || 84600;

// Database Configuration
export const DB_HOST: string = process.env.DB_HOST || "localhost";
export const DB_USER: string = process.env.DB_USER || "localhost";
export const DB_PASSWORD: string = process.env.DB_PASSWORD || "localhost";
export const DB_NAME: string = process.env.DB_NAME || "localhost";
export const DB_PORT: number = parseInt(process.env.DB_PORT as string) || 1433;

// JWT Secret Key
export const JWT_SECRET: string = process.env.JWT_SECRET || "secret";

// OpenAI Key
export const OPENAI_KEY: string =
  process.env.OPENAI_KEY || "My API Key";
