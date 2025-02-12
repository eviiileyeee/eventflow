const multer = require('multer');
const fs = require('fs'); // ✅ Import File System module
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads'); // Adjust path if necessary

// ✅ Check if "uploads" folder exists, if not, create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // ✅ Ensure directory exists before saving
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  console.log("Uploaded file:", file.originalname); // Log the uploaded file name

  const allowedTypes = /jpeg|jpg|png|gif|webp/; // Added webp to allowed types

  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter,
});


module.exports = upload;
