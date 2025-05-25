const { favoriteCollection } = require("../utils/connectDB");


const getAllFavorites = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const favorites = await favoriteCollection
      .find({ email })
      .sort({ createdAt: -1 })
      .toArray();

    res.status(200).json({
      message: "Favorite items retrieved successfully",
      favorites,
    });
  } catch (err) {
    console.error("Get favorites error:", err);
    res.status(500).json({ message: "Error fetching favorites", error: err.message });
  }
};

module.exports = { getAllFavorites };
