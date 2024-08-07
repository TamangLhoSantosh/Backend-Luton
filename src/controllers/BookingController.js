const Booking = require("../models/Booking");

// Create a new booking
const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("room");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("room");
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a booking by ID
const updateBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a booking by ID
const deleteBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
};
