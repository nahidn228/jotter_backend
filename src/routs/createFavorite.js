const { userCollection, favoriteCollection } = require("../utils/connectDB");


const createFavorite = async (req, res) => {
  try {
    const { itemId, email, type } = req.body;

    if (!itemId || !email || !type) {
      return res.status(400).json({ message: "itemId, email, and type are required" });
    }

    // Check if user exists
    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    // Check if favorite already exists
    const existingFavorite = await favoriteCollection.findOne({ itemId, email });
    if (existingFavorite) {
      return res.status(400).json({ message: "Already added to favorites" });
    }

    const favorite = {
      itemId,
      email,
      type,
      createdAt: new Date(),
    };

    await favoriteCollection.insertOne(favorite);

    res.status(201).json({
      message: "Favorite added successfully",
      favorite,
    });
  } catch (err) {
    console.error("Create favorite error:", err);
    res.status(500).json({ message: "Error adding to favorites", error: err.message });
  }
};

module.exports = { createFavorite };
