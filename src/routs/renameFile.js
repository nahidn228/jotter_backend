
const { ObjectId } = require("mongodb");
const { noteCollection, imageCollection, pdfCollection, folderCollection } = require("../utils/connectDB");

const renameFile = async (req, res) => {
  try {
    const { collectionType, id, newName } = req.body;

    if (!collectionType || !id || !newName) {
      return res.status(400).json({ message: "collectionType, id, and newName are required" });
    }

    const objectId = new ObjectId(id);
    let collection;
    let updateField;

    switch (collectionType) {
      case "note":
        collection = noteCollection;
        updateField = { filename: newName }; 
        break;
      case "image":
        collection = imageCollection;
        updateField = { filename: newName }; 
        break;
      case "pdf":
        collection = pdfCollection;
        updateField = { filename: newName }; 
        break;
      case "folder":
        collection = folderCollection;
        updateField = { folderName: newName }; 
        break;
      default:
        return res.status(400).json({ message: "Invalid collectionType" });
    }

    const result = await collection.updateOne(
      { _id: objectId },
      { $set: updateField }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "File not found or already renamed" });
    }

    res.status(200).json({ message: "File renamed successfully" });

  } catch (err) {
    console.error("Rename error:", err);
    res.status(500).json({ message: "Error renaming file", error: err.message });
  }
};

module.exports = { renameFile };
