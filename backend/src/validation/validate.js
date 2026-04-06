import { ResponseError } from "../errors/responseError.js";

export const validate = (schema, data) => {
  const validation = schema.safeParse(data);

  if (!validation.success) {
    const errors = validation.error.errors.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    throw new ResponseError(400, `Validation failed: ${JSON.stringify(errors)}`);
  }

  return validation.data;
};

export default validate;
