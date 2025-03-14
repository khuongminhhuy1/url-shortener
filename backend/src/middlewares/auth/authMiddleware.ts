import { Request, Response, NextFunction } from "express";
import jwtServices from "../../services/jwtServices";
import { AppError } from "../error/errorHandler";
import { JwtPayload } from "../../types/jwtPayload";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

class AuthMiddleware {
  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Access token is required", 401));
    }

    const accessToken = authHeader.split(" ")[1];

    const decoded = jwtServices.verifyToken(accessToken) as JwtPayload | null;
    if (!decoded) {
      return next(new AppError("Invalid access token", 403));
    }

    req.user = decoded;
    next();
  };
}

export default new AuthMiddleware();
