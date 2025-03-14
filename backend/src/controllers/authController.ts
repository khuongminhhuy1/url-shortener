import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import passwordServices from "../services/passwordServices";
import jwtServices from "../services/jwtServices";
import { AppError } from "../middlewares/error/errorHandler";
import emailServices from "../services/emailServices";
import cryptoUtils from "../utils/cryptoUtils";

const prisma = new PrismaClient();

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return next(new AppError("Name, email, and password are required", 400));
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return next(new AppError("User already exists", 400));
    }

    const hashedPassword = await passwordServices.hashPassword(password);
    const verificationToken = cryptoUtils.generateToken();

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    await prisma.verificationToken.create({
      data: {
        userId: newUser.id,
        token: verificationToken,
      },
    });
    await emailServices.sendVerificationEmail(email, verificationToken);
    return res
      .status(201)
      .json({ message: "User registered! Please verify your email." });
  }

  async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = req.query;
      if (!token) {
        return next(new AppError("Verification token is required", 400));
      }

      // Fetch token from the database
      const verificationRecord = await prisma.verificationToken.findUnique({
        where: { token: token as string },
        include: { user: true },
      });

      if (!verificationRecord) {
        return next(new AppError("Invalid or expired token", 400));
      }

      // Mark user as verified
      await prisma.user.update({
        where: { id: verificationRecord.userId },
        data: { verified: true },
      });

      // Delete the verification token after successful verification
      await prisma.verificationToken.delete({
        where: { id: verificationRecord.id },
      });

      res.status(200).json({ message: "Email verified successfully!" });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.verified) {
      return next(new AppError("User not found or email not verified", 404));
    }

    const isMatch = await passwordServices.comparePassword(
      password,
      user.password
    );
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwtServices.generateToken({
      userId: user.id,
      username: user.name,
    });

    const refreshToken = jwtServices.generateRefreshToken({
      userId: user.id,
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Login successful" });
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(200).json({ message: "Logged out successfully" });
    }

    // Hash the token before searching in DB (assuming tokens are stored hashed)
    const hashedRefreshToken = cryptoUtils.hashToken(refreshToken);

    // Delete refresh token from DB
    await prisma.refreshToken.deleteMany({
      where: { token: hashedRefreshToken },
    });

    // Clear cookies
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res.status(200).json({ message: "Logged out successfully" });
  }
}

export default new AuthController();
