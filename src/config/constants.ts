import { config } from "dotenv";

config();

export const SESSION_COOKIE_KEY = process.env.SESSION_COOKIE_KEY || "session";
export const FRONT_END_REDIRECT_URL = process.env.FRONT_END_REDIRECT_URL || "/users/profile";
