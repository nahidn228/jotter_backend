const { userCollection } = require("../../utils/connectDB");

const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // Validate input
    if (!email || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Email and new password required" });
    }

    // Find user by email
    const user = await userCollection.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Your password not matched" });
    }

    // Update password
    const result = await userCollection.updateOne(
      { email },
      { $set: { password: newPassword } }
    );

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Error updating password" });
  }
};

module.exports = { forgotPassword };
