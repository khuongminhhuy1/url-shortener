import { Request, Response, NextFunction } from "express";

class AppError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err); // Log the error
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};

export { AppError, errorHandler };
