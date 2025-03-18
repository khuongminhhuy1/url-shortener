import express from "express";
import authController from "../controllers/authController";
import { catchAsync } from "../middlewares/error/catchAsync";
import tokenController from "../controllers/tokenController";

const router = express.Router();

router.post("/register", catchAsync(authController.register));
router.get("/verify-email", catchAsync(authController.verifyEmail));
router.post("/login", catchAsync(authController.login));
router.post("/logout", catchAsync(authController.logout));
router.get("/refresh-token", catchAsync(tokenController.refreshTokenHandler));
router.get("/verify-session", catchAsync(tokenController.verifySession));
router.post("/forgot-password", catchAsync(authController.forgotPassword));
router.post("/reset-password", catchAsync(authController.resetPassword));
export default router;
