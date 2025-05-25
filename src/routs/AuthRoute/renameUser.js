// controllers/userController.js

const { userCollection } = require("../../utils/connectDB");


const renameUser = async (req, res) => {
  try {
    const { email, newUsername } = req.body;

    if (!email || !newUsername) {
      return res.status(400).json({ message: "Email and new username are required" });
    }

    const user = await userCollection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const result = await userCollection.updateOne(
      { email },
      { $set: { username: newUsername } }
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to rename user" });
    }

    res.status(200).json({ message: "Username updated successfully", email, newUsername });
    
  } catch (error) {
    console.error("Rename user error:", error);
    res.status(500).json({ message: "Error renaming user", error: error.message });
  }
};

module.exports = { renameUser };
