const { userCollection, folderCollection } = require("../../utils/connectDB");


const createFolder = async (req, res) => {
  try {
    const { folderName, email } = req.body;

    if (!folderName || !email) {
      return res.status(400).json({ message: "Folder name and email are required" });
    }

    // Check if user exists
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    // Check if folder already exists for this user
    const existingFolder = await folderCollection.findOne({ folderName, email });
    if (existingFolder) {
      return res.status(400).json({ message: "Folder with this name already exists" });
    }

    const folder = {
      folderName,
      email,
      createdAt: new Date(),
    };

    await folderCollection.insertOne(folder);

    res.status(201).json({
      message: "Folder created successfully",
      folder,
    });
  } catch (err) {
    console.error("Create folder error:", err);
    res.status(500).json({ message: "Error creating folder", error: err.message });
  }
};

module.exports = { createFolder };
