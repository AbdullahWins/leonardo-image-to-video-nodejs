const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { resolve } = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  // Check if the destination folder exists and create it if it doesn't
  destination: function (req, file, cb) {
    const dir = resolve(__dirname, "../uploads/"); // Use project root directory
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Ensure all directories in the path are created
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });

// Export the multer instance
module.exports = upload;
