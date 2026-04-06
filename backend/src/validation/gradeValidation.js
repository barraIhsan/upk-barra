import { z } from "zod";

export const createGradeSchema = z.object({
  studentId: z.string().uuid("Invalid student ID"),
  subjectId: z.string().uuid("Invalid subject ID"),
  grade: z.number().min(0).max(100, "Grade must be between 0-100"),
});

export const updateGradeSchema = z.object({
  grade: z.number().min(0).max(100, "Grade must be between 0-100"),
});
