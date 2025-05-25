const { userCollection } = require("../../utils/connectDB");


const deleteUser = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const result = await userCollection.deleteOne({ email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found or already deleted" });
    }

    res.status(200).json({ message: "User deleted successfully", email });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

module.exports = { deleteUser };
