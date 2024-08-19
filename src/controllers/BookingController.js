const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Guest = require("../models/Guest");

// Create a new booking
const createBooking = async (req, res) => {
  const {
    roomType,
    checkInDate,
    checkOutDate,
    guestName,
    guestEmail,
    guestPhone,
    total,
  } = req.body;

  let guest;
  try {
    const room = await Room.find({ roomType: roomType });

    // Check for the required room type
    if (!room)
      return res.status(404).json({ error: "Room of required type not found" });

    // Check if the room is available for the check-in and check-out dates
    let availableRoom = await Booking.findOne({
      roomType: roomType, // Room of the required type
      checkOut: { $lte: req.body.checkIn }, // Room checks out before the requested check-in
      checkIn: { $gte: req.body.checkOut }, // Room checks in after the requested check-out
    });

    if (!availableRoom)
      return res.status(404).json({
        error: "Room of required type is not available for the requested dates",
      });

    // Check if the user is logged in
    if (!req.user._id) {
      // Check if the guest already exists
      guest = await Guest.findOne({
        guestName: guestName,
        guestEmail: guestEmail,
      });

      // Create a new guest if the guest does not exist
      if (!guest) {
        guest = new Guest({
          guestName: guestName,
          guestEmail: guestEmail,
          guestPhone: guestPhone,
        });
        await guest.save();
      }
    }

    // Create a new booking
    const booking = new Booking({
      guest: guest._id ?? "",
      user: req.user._id ?? "",
      room: availableRoom._id,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      totalPrice: total,
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
    const filters = {};

    // Extract filters from query parameters
    if (req.query.user) {
      filters.user = req.query.user;
    }
    if (req.query.status) {
      filters.status = req.query.status;
    }
    if (req.query.bookingDate) {
      filters.createdAt = req.query.bookingDate;
    }
    if (req.query.roomType) {
      filters.roomType = req.query.roomType;
    }

    // Find rooms based on filters and join with the user and room
    const bookings = await Booking.find(filters).populate("user");

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
  const { roomType, checkInDate, checkOutDate } = req.body;
  try {
    const rooms = await Room.find({ roomType: roomType });
    if (!rooms)
      return res.status(404).json({ error: "Room of required type not found" });

    const bookings = await Booking.find({
      checkOutDate: { $gte: checkInDate },
      checkInDate: { $lte: checkOutDate },
    });

    // Get booked room IDs
    const bookedRoomIds = bookings.map((booking) => booking.room.toString());

    // Filter out booked rooms to get available rooms
    const availableRooms = rooms.filter(
      (room) => !bookedRoomIds.includes(room._id.toString())
    );

    if (availableRooms.length === 0) {
      return res.status(404).json({
        error:
          "No rooms of the required type are available for the requested dates",
      });
    }

    res.status(200).json({ message: "Rooms available" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get available room
const getAvailableRoom = async (req, res) => {
  const { roomType, checkInDate, checkOutDate } = req.body;
  try {
    const rooms = await Room.find({ roomType: roomType });
    if (!rooms)
      return res.status(404).json({ error: "Room of required type not found" });

    const bookings = await Booking.find({
      checkOutDate: { $gte: checkInDate },
      checkInDate: { $lte: checkOutDate },
    });

    // Get booked room IDs
    const bookedRoomIds = bookings.map((booking) => booking.room.toString());

    // Filter out booked rooms to get available rooms
    const availableRooms = rooms.filter(
      (room) => !bookedRoomIds.includes(room._id.toString())
    );

    if (availableRooms.length === 0) {
      return res.status(404).json({
        error:
          "No rooms of the required type are available for the requested dates",
      });
    }

    res.status(200).json(availableRooms);
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
  getAvailableRoom,
};
