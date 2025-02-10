const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadToCloudinary = async (filePath) => {
  try {
    console.log("Uploading file to Cloudinary:", filePath); // Log the file path being uploaded
    const result = await cloudinary.uploader.upload(filePath, {

      folder: 'events'
    });
    console.log("image uploaded on cloudinary");
    return {
      url: result.secure_url,
      public_id: result.public_id
    };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error); // Log the error
    throw new Error('Error uploading to Cloudinary: ' + error.message); // Include error message in the thrown error


  }
};

exports.deleteFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error('Error deleting from cloudinary');
  }
};
