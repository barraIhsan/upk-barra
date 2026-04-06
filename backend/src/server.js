import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Error handling middleware
app.use(errorMiddleware);

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
