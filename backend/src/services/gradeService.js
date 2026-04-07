import { v4 as uuidv4 } from "uuid";
import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import { gradeSchema } from "../validation/gradeValidation.js";
import validate from "../validation/validate.js";

export const getGrades = async (req) => {
  const { search } = req.query;

  let where = "";
  let params = [];

  if (search) {
    where = `
      WHERE student_name LIKE ?
      OR subject LIKE ?
      OR CAST(score AS CHAR) LIKE ?
    `;
    const keyword = `%${search}%`;
    params = [keyword, keyword, keyword];
  }

  const [rows] = await pool.query(`SELECT * FROM grades ${where}`, params);

  return rows;
};

export const createGrade = async (req) => {
  const validated = validate(gradeSchema, req.body);
  const { student_name, subject, score } = validated;

  const uuid = uuidv4();
  await pool.query(
    "INSERT INTO grades (id, student_name, subject, score) VALUES (?, ?, ?, ?)",
    [uuid, student_name, subject, score],
  );

  return {
    id: uuid,
    student_name,
    subject,
    score,
  };
};

export const updateGradeById = async (req) => {
  const validated = validate(gradeSchema, req.body);
  const { student_name, subject, score } = validated;

  const [rows] = await pool.query(
    "UPDATE grades SET student_name = ?, subject = ?, score = ? WHERE id = ?",
    [student_name, subject, score, req.params.id],
  );

  if (rows.affectedRows === 0) {
    throw new ResponseError(404, "Grade not found");
  }
};

export const deleteGradeById = async (req) => {
  const [rows] = await pool.query("DELETE FROM grades WHERE id = ?", [
    req.params.id,
  ]);

  if (rows.affectedRows === 0) {
    throw new ResponseError(404, "Grade not found");
  }
};
