import { Request, Response, NextFunction } from "express";
import urlServices from "../services/urlServices";
import { AppError } from "../middlewares/error/errorHandler";

class UrlController {
  constructor() {}

  async shortenUrl(req: Request, res: Response, next: NextFunction) {
    try {
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
    } catch (error) {
      return next(error);
    }
  }

  async redirectUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const { shortCode } = req.params;
      const url = await urlServices.getOriginalUrl(shortCode);
      if (!url) {
        return next(new AppError("URL not found", 404));
      }
      await urlServices.incrementClickCount(shortCode);
      return res.redirect(url.original);
    } catch (error) {
      return next(error);
    }
  }

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const { shortCode } = req.params;
      const urlStats = await urlServices.getStats(shortCode);

      if (!urlStats) {
        return next(new AppError("Stats not found", 404));
      }

      return res.json(urlStats);
    } catch (error) {
      return next(error);
    }
  }
}

export default new UrlController();
