import * as GradeService from "../services/gradeService.js";

export const getGradesHandler = async (req, res, next) => {
  try {
    const response = await GradeService.getGrades(req);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const createGradeHandler = async (req, res, next) => {
  try {
    const response = await GradeService.createGrade(req);

    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const updateGradeByIdHandler = async (req, res, next) => {
  try {
    await GradeService.updateGradeById(req);

    res.status(200).json({
      status: "success",
      message: "Grade successfully updated",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteGradeByIdHandler = async (req, res, next) => {
  try {
    await GradeService.deleteGradeById(req);

    res.status(200).json({
      status: "success",
      message: "Grade successfully deleted",
    });
  } catch (err) {
    next(err);
  }
};
