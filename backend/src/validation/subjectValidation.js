import { z } from "zod";

export const createSubjectSchema = z.object({
  name: z.string().min(1, "Subject name is required"),
});

export const updateSubjectSchema = z.object({
  name: z.string().min(1, "Subject name is required").optional(),
});
