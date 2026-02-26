// Middleware to handle errors from multer file upload
function uploadErrorHandler(err, req, res, next) {
  // Check if the error is a multer error for file size limit
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      message: "Image must be less than 5MB",
    });
  }

  // Check if the error is from file filter for invalid file type
  if (err.message === "Only image files are allowed") {
    return res.status(400).json({
      message: "Only image files are allowed",
    });
  }

  next(err);
}

module.exports = uploadErrorHandler;
