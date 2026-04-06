import { z } from "zod";

export const createStudentSchema = z.object({
  name: z.string().min(1, "Student name is required"),
  generation: z.number().int().min(2000, "Invalid generation year"),
});

export const updateStudentSchema = z.object({
  name: z.string().min(1, "Student name is required").optional(),
  generation: z.number().int().min(2000, "Invalid generation year").optional(),
});
