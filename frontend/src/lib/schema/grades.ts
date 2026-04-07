import z from "zod";

export const gradeSchema = z
  .object({
    student_name: z
      .string("Student name must be a string")
      .min(1, "Student name must not be empty")
      .max(100, "Student name must not contain more than 100 characters"),
    subject: z
      .string("Subject must be a string")
      .min(1, "Subject must not be empty")
      .max(100, "Subject must not contain more than 100 characters"),
    score: z
      .number("Score must be a number")
      .int("Score must be an integer")
      .min(0, "Score must be at least 0")
      .max(100, "Score must not exceed 100"),
  })
  .strict();

export const gradeApiSchema = gradeSchema.extend({
  id: z.uuid("Id must be a uuid"),
});
