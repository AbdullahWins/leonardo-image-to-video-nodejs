const express = require("express");
const { handleImageUpload } = require("../controllers/motion.controller");
const upload = require("../../configs/multer.config");
const router = express.Router(); // Adjust path as necessary

// Route for generating video from image
router.post("/generate", upload.single("image"), handleImageUpload);

module.exports = router;
