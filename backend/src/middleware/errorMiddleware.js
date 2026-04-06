export const errorMiddleware = (err, _req, res, _next) => {
  // Prisma unique constraint error
  if (err.code === "P2002") {
    err.status = 400;
    err.message = `Data already exists: ${err.meta?.target?.join(", ")}`;
  }

  // Prisma record not found
  if (err.code === "P2025") {
    err.status = 404;
    err.message = "Record not found";
  }

  // Prisma validation error
  if (err.code === "P2003") {
    err.status = 400;
    err.message = "Invalid reference to related record";
  }

  const statusCode = err.status || 500;
  const bodyStatus = statusCode < 500 ? "fail" : "error";

  res.status(statusCode).json({
    status: bodyStatus,
    message: err.message || "Internal Server Error",
  });
};
