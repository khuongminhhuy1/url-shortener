import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jwtServices from "../services/jwtServices";
import { AppError } from "../middlewares/error/errorHandler";
import cryptoUtils from "../utils/cryptoUtils";

const prisma = new PrismaClient();

class TokenController {
  constructor() {}
  async refreshTokenHandler(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return next(new AppError("Refresh token is required", 400));
    }

    // Verify refresh token
    const decoded = jwtServices.verifyRefreshToken(refreshToken);
    if (!decoded) {
      return next(new AppError("Invalid refresh token", 400));
    }

    // Hash the incoming refresh token (since we store hashed values in DB)
    const hashedRefreshToken = cryptoUtils.hashToken(refreshToken);

    // Check if token exists in the database
    const storedToken = await prisma.refreshToken.findFirst({
      where: { token: hashedRefreshToken },
    });

    if (!storedToken) {
      return next(new AppError("Invalid refresh token", 403));
    }

    if (new Date(storedToken.expiresAt) < new Date()) {
      await prisma.refreshToken.delete({ where: { id: storedToken.id } });
      return next(
        new AppError("Refresh token expired, please log in again", 403)
      );
    }

    // Fetch user
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    // Generate new tokens
    const newAccessToken = jwtServices.generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const newRefreshToken = jwtServices.generateRefreshToken({
      id: user.id,
    });

    // Hash the new refresh token before storing
    const hashedNewRefreshToken = cryptoUtils.hashToken(newRefreshToken);

    // Delete old refresh token and store the new one
    await prisma.refreshToken.deleteMany({ where: { userId: user.id } });
    await prisma.refreshToken.create({
      data: {
        token: hashedNewRefreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    // Set refresh & access tokens in HTTP-only cookies
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.cookie("token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return res.status(200).json({ accessToken: newAccessToken });
  }
}
export default new TokenController();
