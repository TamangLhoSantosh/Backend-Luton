const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");

// Create a new user
// POST /users
router.post("/", userController.createUser);

// Get all users
// GET /users
router.get("/", userController.getAllUsers);

// Get a user by ID
// GET /users/:id
router.get("/:id", userController.getUserById);

// Update a user by ID
// PUT /users/:id
router.put("/:id", userController.updateUserById);

// Delete a user by ID
// DELETE /users/:id
router.delete("/:id", userController.deleteUserById);

module.exports = router;
