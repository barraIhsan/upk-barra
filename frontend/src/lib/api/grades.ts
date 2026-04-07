import axios from "axios";
import type z from "zod";
import type { gradeSchema } from "../schema/grades";

const BASE_URL = "http://localhost:3000";

export const getGrades = async (search?: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/grades`, {
      params: {
        search: search,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteGrade = async (id: string) => {
  try {
    await axios.delete(`${BASE_URL}/grades/${id}`);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const addGrade = async (data: z.infer<typeof gradeSchema>) => {
  try {
    const response = await axios.post(`${BASE_URL}/grades`, data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const editGrade = async (
  id: string,
  data: z.infer<typeof gradeSchema>,
) => {
  try {
    const response = await axios.put(`${BASE_URL}/grades/${id}`, data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
