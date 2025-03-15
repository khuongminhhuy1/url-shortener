import { Request, Response, NextFunction } from "express";
import urlServices from "../services/urlServices";
import { AppError } from "../middlewares/error/errorHandler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UrlController {
  constructor() {}

  async shortenUrl(req: Request, res: Response, next: NextFunction) {
    const { original } = req.body;
    const userId = req.user?.userId;
    if (!original) {
      return next(new AppError("Please provide a valid URL", 400));
    }
    if (!userId) {
      return next(new AppError("User authentication required", 401));
    }
    const newUrl = await urlServices.generateShortUrl(original, userId);
    console.log("Shortened URL saved:", newUrl);
    return res.status(201).json(newUrl);
  }

  async redirectUrl(req: Request, res: Response, next: NextFunction) {
    const { shortCode } = req.params;
    const url = await urlServices.getOriginalUrl(shortCode);
    if (!url) {
      return next(new AppError("URL not found", 404));
    }
    await urlServices.incrementClickCount(shortCode);
    return res.redirect(url.original);
  }
  async getStats(req: Request, res: Response, next: NextFunction) {
    const { shortCode } = req.params;
    const urlStats = await urlServices.getStats(shortCode);

    if (!urlStats) {
      return next(new AppError("Stats not found", 404));
    }

    return res.json(urlStats);
  }
  async getUserUrls(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    const urls = await prisma.shortURL.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return res.status(200).json(urls);
  }

  async deleteUrl(req: Request, res: Response) {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError("User not authenticated", 401);
    }

    // Ensure the URL belongs to the logged-in user
    const url = await prisma.shortURL.findUnique({
      where: { id },
    });

    if (!url) {
      throw new AppError("URL not found", 404);
    }

    if (url.userId !== userId) {
      throw new AppError("Unauthorized to delete this URL", 403);
    }

    // Delete the URL
    await prisma.shortURL.delete({ where: { id } });

    return res.status(200).json({ message: "URL deleted successfully" });
  }
}
export default new UrlController();
