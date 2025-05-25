const { ObjectId } = require("mongodb");
const { folderCollection } = require("../utils/connectDB");

const getSingleFolder = async (req, res) => {
  try {
    const folderId = req.params.id;

    const folder = await folderCollection.findOne({
      _id: new ObjectId(folderId),
    });

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    res.status(200).json(folder);
  } catch (error) {
    console.error("Error fetching folder:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { getSingleFolder };
