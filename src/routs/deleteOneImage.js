const { ObjectId } = require("mongodb");
const {  imageCollection } = require("../utils/connectDB");


const deleteOneImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const objectId = new ObjectId(id);
    const result = await imageCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted successfully" });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Error deleting Image", error: err.message });
  }
};

module.exports = { deleteOneImage };
