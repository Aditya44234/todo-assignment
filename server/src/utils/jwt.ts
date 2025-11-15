import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js"; // Use .js if compiled, or .ts if pure TS

// Sign JWT with proper expiry
export const signJWT = (payload: object): string =>
  jwt.sign(payload, JWT_SECRET as string, { expiresIn: "1d" }); // Use "1d" for one day

// Verify JWT and return decoded payload
export const verifyJWT = (token: string): jwt.JwtPayload =>
  jwt.verify(token, JWT_SECRET as string) as jwt.JwtPayload;
