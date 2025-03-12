import express from "express";
import urlController from "../controllers/urlController";
import { catchAsync } from "../middlewares/error/catchAsync";

const router = express.Router();

router.post("/shorten", catchAsync(urlController.shortenUrl));
router.get("/:shortCode", catchAsync(urlController.redirectUrl));
router.get("/stats/:shortCode", catchAsync(urlController.getStats));

export default router;
