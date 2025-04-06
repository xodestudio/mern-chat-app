import multer from "multer";
import { ApiError } from "../utils/ApiError.js";
import path from "path";
import fs from "fs";

// Directory where files will be temporarily stored
const TEMP_DIR = path.join(process.cwd(), "public", "temp");

// Ensure the temp directory exists, otherwise create it
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_DIR); // Store files in the temporary directory
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname); // Get file extension
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    cb(null, uniqueName); // Ensure unique filenames
  },
});

// File filter to allow all types of files
const fileFilter = (req, file, cb) => {
  // Accept all file types
  cb(null, true);
};

// Multer instance with storage, limits, and file filter
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // Limit file size to 50MB
  },
  fileFilter,
});

// Custom error handling middleware for upload
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(400).json({ success: false, message: err.message });
  } else if (err) {
    // Other errors
    return next(new ApiError(500, err.message));
  }
  next(); // Proceed to the next middleware if no error
};

export { upload, handleUploadError };
