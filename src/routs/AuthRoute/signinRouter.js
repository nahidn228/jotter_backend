const { userCollection } = require("../../utils/connectDB");


const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check for required fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await userCollection.find({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Login success
    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
};

module.exports = { signin };
