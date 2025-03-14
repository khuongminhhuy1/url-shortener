import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JwtPayload } from "../types/jwtPayload";
dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY || "Your own key here";
const REFRESH_KEY = process.env.REFRESH_KEY || "Your own key here";
const JWT_EXPIRES_IN = "1h";
const REFRESH_EXPIRES_IN = "7d";

class JwtService {
  generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }
  generateRefreshToken(payload: object): string {
    return jwt.sign(payload, REFRESH_KEY, {
      expiresIn: REFRESH_EXPIRES_IN,
    });
  }

  verifyToken(token: string): object | null {
    try {
      return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload | null;
    } catch (error) {
      return null;
    }
  }
  verifyRefreshToken(token: string): JwtPayload | null {
    try {
      return jwt.verify(token, REFRESH_KEY) as JwtPayload;
    } catch (error) {
      return null;
    }
  }
}

export default new JwtService();
