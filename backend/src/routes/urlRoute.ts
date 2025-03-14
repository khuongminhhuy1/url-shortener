import express from "express";
import urlController from "../controllers/urlController";
import { catchAsync } from "../middlewares/error/catchAsync";
import authMiddleware from "../middlewares/auth/authMiddleware";

const router = express.Router();

router.post(
  "/shorten",
  catchAsync(authMiddleware.authenticate),
  catchAsync(urlController.shortenUrl)
);
router.get("/:shortCode", catchAsync(urlController.redirectUrl));
router.get(
  "/stats/:shortCode",
  catchAsync(authMiddleware.authenticate),
  catchAsync(urlController.getStats)
);

export default router;
