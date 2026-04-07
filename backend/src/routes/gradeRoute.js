import express from "express";
import {
  createGradeHandler,
  deleteGradeByIdHandler,
  getGradesHandler,
  updateGradeByIdHandler,
} from "../controllers/gradeController.js";

const gradeRouter = express.Router();

gradeRouter.get("/", getGradesHandler);
gradeRouter.post("/", createGradeHandler);
gradeRouter.put("/:id", updateGradeByIdHandler);
gradeRouter.delete("/:id", deleteGradeByIdHandler);

export default gradeRouter;
