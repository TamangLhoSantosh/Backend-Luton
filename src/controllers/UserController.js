const User = require("../models/User");
const domain = "http://localhost:8000";

// Get all users
const getAllUsers = async (req, res) => {
  // Extract query parameters
  const { role, isActive } = req.query;
  try {
    // Build the query object
    const filters = {};
    if (role) filters.role = role;
    if (isActive) filters.isActive = isActive;

    // Find users based on the filters
    const users = await User.find({ ...filters, role: { $ne: "admin" } });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search user
const searchUser = async (req, res) => {
  try {
    const { search } = req.query;
    const users = await User.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
      role: { $ne: "admin" },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  searchUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
