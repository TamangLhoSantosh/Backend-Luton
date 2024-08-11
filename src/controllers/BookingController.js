const Booking = require("../models/Booking");
const Room = require("../models/Room");

// Create a new booking
const createBooking = async (req, res) => {
  const { roomType, checkIn, checkOut } = req.body;
  try {
    const room = await Room.find({ roomType: roomType });
    if (!room)
      return res.status(404).json({ error: "Room of required type not found" });

    // Check if the room is available for the check-in and check-out dates
    let availableRoom = await Booking.findOne({
      room: room._id, // Room of the required type
      checkOut: { $lte: req.body.checkIn }, // Room checks out before the requested check-in
      checkIn: { $gte: req.body.checkOut }, // Room checks in after the requested check-out
    });

    if (!availableRoom)
      return res.status(404).json({
        error: "Room of required type is not available for the requested dates",
      });
    // Calculate the total price
    const roomRate = room.pricePerNight;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const totalDays = (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24); // Calculate the number of days
    const totalPrice = roomRate * totalDays;

    // Create a new booking
    const booking = new Booking({
      room: room._id,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      totalPrice: totalPrice,
    });

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

// Check room availability
const checkRoomAvailability = async (req, res) => {
  const { roomType, checkIn, checkOut } = req.body;
  try {
    const room = await Room.find({ roomType: roomType });
    if (!room)
      return res.status(404).json({ error: "Room of required type not found" });

    // Check if the room is available for the given dates
    const availableRoom = await Room.findOne({
      room: room._id,
      checkOut: { $lte: new Date(checkIn) }, // Room checks out before requested check-in
      checkIn: { $gte: new Date(checkOut) }, // Room checks in after requested check-out
    });

    if (!availableRoom) {
      return res.status(404).json({
        error: "Room of required type is not available for the requested dates",
      });
    }

    res.status(200).json({ availableRoom });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingById,
  deleteBookingById,
  checkRoomAvailability,
};
