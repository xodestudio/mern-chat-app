const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      console.error("Error in asyncHandler:", err.message);

      const statusCode = err.status || 500;

      res
        .status(statusCode)
        .json({
          success: false,
          message: err.message,
          ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
        });
    });
  };
};

export { asyncHandler };
