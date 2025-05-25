const { userCollection, imageCollection } = require("../../utils/connectDB");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//dummy storage
const uploadDir = "uploads";


// Ensure uploads folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });


const uploadImage = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const image = {
      filename: req.file.filename,
      path: req.file.path,
      userEmail: email,
      uploadedAt: new Date(),
    };

    await imageCollection.insertOne(image);

    res.status(201).json({
      message: "Image uploaded successfully",
      image,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Error uploading image", error: err.message });
  }
};

module.exports = { uploadImage, upload };
