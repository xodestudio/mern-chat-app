import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload image to Cloudinary
const uploadFile = async (filePath) => {
  if (!filePath || typeof filePath !== "string") {
    console.error("Invalid file path provided");
    return null;
  }

  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // Remove the local file after successful upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Return the secure URL of the uploaded file
    return response.secure_url;
  } catch (error) {
    console.error("Failed to upload file to Cloudinary:", error.message);
    throw new Error("File upload failed");
  }
};

export { uploadFile };
