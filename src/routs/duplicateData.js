
const { ObjectId } = require("mongodb");
const { noteCollection, imageCollection, pdfCollection, folderCollection } = require("../utils/connectDB");

const duplicateData = async (req, res) => {
  try {
    const { collectionType, id } = req.body;

    if (!collectionType || !id) {
      return res.status(400).json({ message: "collectionType and id are required" });
    }

    const objectId = new ObjectId(id);
    let collection;

    switch (collectionType) {
      case "note":
        collection = noteCollection;
        break;
      case "image":
        collection = imageCollection;
        break;
      case "pdf":
        collection = pdfCollection;
        break;
      case "folder":
        collection = folderCollection;
        break;
      default:
        return res.status(400).json({ message: "Invalid collectionType" });
    }

    const originalData = await collection.findOne({ _id: objectId });

    if (!originalData) {
      return res.status(404).json({ message: "Data not found" });
    }

    // Remove _id so it can be inserted as a new Data
    delete originalData._id;

    // Consistently append " copy" to name-related fields
    if (originalData.filename) originalData.filename += " copy";
    if (originalData.folderName) originalData.folderName += " copy";

    // Update timestamp
    originalData.createdAt = new Date();

    const result = await collection.insertOne(originalData);

    res.status(201).json({
      message: "Your Data duplicated successfully",
      duplicatedId: result.insertedId,
    });
  } catch (err) {
    console.error("Duplicate error:", err);
    res.status(500).json({ message: "Error duplicating Data", error: err.message });
  }
};

module.exports = { duplicateData };
