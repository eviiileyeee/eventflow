const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadToCloudinary = async (filePath) => {
  try {
    console.log("Uploading file to Cloudinary:", filePath);
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'events'
    });
    console.log("Image uploaded to Cloudinary:", result.secure_url);
    
    // Return both secure_url and url to match controller expectations
    return {
      secure_url: result.secure_url,
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error; // Throw the original error to preserve the stack trace
  }
};

exports.deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error; // Throw the original error to preserve the stack trace
  }
};