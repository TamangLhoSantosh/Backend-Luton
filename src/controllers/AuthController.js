const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const domain = "http://localhost:8000";

dotenv.config();

// Register a new user
const registerUser = async (req, res) => {
  try {
    // Check if email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ error: "Email already taken" });

    // `Check if username already exists
    user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).json({ error: "Username alraedy taken" });

    if (req.file) {
      const profileImage = `${domain}/uploads/profiles/${req.file.filename}`;
      req.body.profileImage = profileImage;
    }

    // Create a new user
    user = new User(req.body);

    // Save the user
    await user.save();

    // Send the response
    res.status(201).json(user);
  } catch (error) {
    // Handle the error
    res.status(400).json({ error: error.message });
  }
};

// Loign a user
const loginUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user;
    if (username) {
      user = await User.findOne({ username });
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          msg: "User logged in successfully",
          token: `Bearer ${token}`,
          user: user,
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

module.exports = {
  registerUser,
  loginUser,
};
