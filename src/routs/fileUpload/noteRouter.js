
const { userCollection } = require("../../utils/connectDB");
const multer = require("multer");
const path = require("path");

//dummy storage
const uploadDir = "uploads";

// Allowed extensions
const allowedDocTypes = [".pdf", ".doc", ".docx", ".txt"];

// Multer storage config for documents
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

// File type validation for docs
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedDocTypes.includes(ext)) {
    return cb(
      new Error("Only .pdf, .doc, .docx, or .txt files are allowed"),
      false
    );
  }
  cb(null, true);
};

const uploadDocMiddleware = multer({
  storage,
  fileFilter,
});

// Controller for document upload
const uploadDoc = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Validate user
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const document = {
      filename: req.file.filename,
      path: req.file.path,
      userEmail: email,
      uploadedAt: new Date(),
    };

  

    res.status(201).json({
      message: "Document uploaded successfully",
      document,
    });
  } catch (err) {
    console.error("Document upload error:", err);
    res.status(500).json({ message: "Error uploading document", error: err.message });
  }
};

module.exports = { uploadDoc, uploadDocMiddleware };
