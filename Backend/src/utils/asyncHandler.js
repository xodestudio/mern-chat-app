const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      const statusCode = err.status || 500;
      res.status(statusCode).json({ success: false, message: err.message });
    });
  };
};

export { asyncHandler };
