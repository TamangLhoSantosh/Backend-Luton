const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/BookingController");

// Create a new booking
// POST /bookings
router.post("/", bookingController.createBooking);

// Get all bookings
// GET /bookings
router.get("/", bookingController.getAllBookings);

// Get a booking by ID
// GET /bookings/:id
router.get("/:id", bookingController.getBookingById);

// Update a booking by ID
// PUT /bookings/:id
router.put("/:id", bookingController.updateBookingById);

// Delete a booking by ID
// DELETE /bookings/:id
router.delete("/:id", bookingController.deleteBookingById);

module.exports = router;
