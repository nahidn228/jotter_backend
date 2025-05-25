const { userCollection, privateCollection } = require("../../utils/connectDB");


const getPrivateDataWithPin = async (req, res) => {
  try {
    const { email, pin } = req.body;

    if (!email || !pin) {
      return res.status(400).json({ message: "Email and PIN are required" });
    }

    // 1. Validate user
    const user = await userCollection.findOne({ email });

    if (!user || user.pin !== pin) {
      return res.status(401).json({ message: "Invalid email or PIN" });
    }

    // 2. Get private data
    const privateData = await privateCollection.find({ email }).toArray();

    res.status(200).json({
      message: "Access granted",
      privateData,
    });

  } catch (error) {
    console.error("Access error:", error);
    res.status(500).json({ message: "Error accessing private data", error: error.message });
  }
};

module.exports = { getPrivateDataWithPin };
