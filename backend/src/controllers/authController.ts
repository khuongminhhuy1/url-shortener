import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import passwordServices from "../services/passwordServices";
import jwtServices from "../services/jwtServices";
import { AppError } from "../middlewares/error/errorHandler";
import emailServices from "../services/emailServices";
import cryptoUtils from "../utils/cryptoUtils";
import { cookieOptions } from "../types/cookiesOptions";

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
      name: user.name,
      email: user.email,
    });

    const refreshToken = jwtServices.generateRefreshToken({
      userId: user.id,
    });
    const hashedRefreshToken = cryptoUtils.hashToken(refreshToken);
    await prisma.refreshToken.create({
      data: {
        token: hashedRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set expiration date
        user: { connect: { id: user.id } }, // Connect the user
      },
    });
    res.cookie("accessToken", token, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);
    res.status(200).json({ message: "Login successful", token: token });
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.cookies?.refreshToken;
    console.log("refresh token: ", refreshToken);
    if (refreshToken) {
      // Hash the token
      const hashedRefreshToken = cryptoUtils.hashToken(refreshToken);

      // First check if the token exists
      const existingToken = await prisma.refreshToken.findFirst({
        where: { token: hashedRefreshToken },
      });

      if (existingToken) {
        // Delete the token if found
        await prisma.refreshToken.delete({
          where: { id: existingToken.id },
        });
      } else {
        // If not found, check all refresh tokens for this user (if user ID is available)
        if (req.user?.userId) {
          const userTokens = await prisma.refreshToken.findMany({
            where: { userId: req.user.userId },
          });
          console.log(`User has ${userTokens.length} tokens in database`);
        }
      }
    }
    // Clear cookies regardless
    res.clearCookie("refreshToken", cookieOptions);
    res.clearCookie("accessToken", cookieOptions);

    return res.status(200).json({ message: "Logged out successfully" });
  }
}

export default new AuthController();
