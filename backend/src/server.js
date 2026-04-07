import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import gradeRouter from "./routes/gradeRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use("/upload", express.static("uploads"));

app.use("/grades", gradeRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
