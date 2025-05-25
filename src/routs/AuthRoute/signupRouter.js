const { userCollection } = require("../utils/connectDB");

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await userCollection.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this username or email",
      });
    }

    // Create user
    const newUser = {
      username,
      email,
      password,
      storage: "15GB",
      createdAt: new Date(),
    };

    const result = await userCollection.insertOne(newUser);
    res.status(201).json({
      message: "User created successfully",
      getStorage: newUser.storage,
      user: newUser,
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Error creating user" });
  }
};

module.exports = { createUser };
