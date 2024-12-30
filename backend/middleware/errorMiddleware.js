const errorHandler = (err, req, res, next) => {
  try {
    // Default to 500 if no status code is set
    const statusCode = res.statusCode ? res.statusCode : 500;

    // Set the status code
    res.status(statusCode);

    // Send the error response
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === "production" ? null : err.stack, // Don't show stack trace in production
    });
  } catch (error) {
    // Handle any error that occurred during error handling
    console.error("Error in error handler:", error);
    res.status(500).json({
      message: "An unexpected error occurred while handling the error.",
    });
  }
};

export default errorHandler;
