import { config } from "dotenv";

config();

export const SESSION_COOKIE_KEY = process.env.SESSION_COOKIE_KEY || "session";
