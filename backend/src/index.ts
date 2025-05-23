import dotenv from "dotenv"; // Import dotenv
import express, { Request, Response } from "express"; // Import express
import cors from "cors"; // Import cors
import { errorHandler } from "./middlewares/error/errorHandler.js";
import urlRoute from "./routes/urlRoute.js"; // Import urlRoute
import authRoute from "./routes/authRoute.js"; // Import authRoute
import cookieParser from "cookie-parser";

const app = express(); // Create an express app
const PORT = parseInt(process.env.PORT as string, 10) || 3000;
const app_url = process.env.APP_URL;
dotenv.config(); // Use dotenv
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: app_url, credentials: true })); // Use cors
app.use("/api/url", urlRoute); // Use urlRoute
app.use("/api/auth", authRoute); // Use authRoute
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("Server is running");
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT} `));
