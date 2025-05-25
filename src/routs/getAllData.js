const {
  userCollection,
  noteCollection,
  imageCollection,
  pdfCollection,
  folderCollection,
} = require("../utils/connectDB");

const getAllData = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if user exists
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    // Fetch all user data in parallel
    const [notes, images, pdfs, folders] = await Promise.all([
      noteCollection.find({ email }).toArray(),
      imageCollection.find({ userEmail: email }).toArray(),
      pdfCollection.find({ userEmail: email }).toArray(),
      folderCollection.find({ email }).toArray(),
    ]);

    res.status(200).json({
      message: "Fetched all data successfully",
      data: {
        notes,
        images,
        pdfs,
        folders,
      },
    });
  } catch (err) {
    console.error("Fetch all data error:", err);
    res
      .status(500)
      .json({ message: "Error fetching data", error: err.message });
  }
};

module.exports = { getAllData };
