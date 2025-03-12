import express, { Request, Response } from "express"; // Import express
import cors from "cors"; // Import cors
import dotenv from "dotenv"; // Import dotenv
import { errorHandler } from "./middlewares/error/errorHandler.js";
import urlRoute from "./routes/urlRoute.js"; // Import urlRoute

const app = express(); // Create an express app

dotenv.config(); // Use dotenv
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.APP_URL, credentials: true }));
app.use(errorHandler);

app.use("/api/url", urlRoute); // Use urlRoute
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT} `)
);
