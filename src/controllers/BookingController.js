const Booking = require("../models/Booking");
const Room = require("../models/Room");
const Guest = require("../models/Guest");
const User = require("../models/User");

// Global variables
const today = new Date();
today.setDate(today.getDate() + 1);
today.setHours(0, 0, 0, 0); // Start of the day
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1); // Start of the next day

// Create a new booking
const createBooking = async (req, res) => {
  const {
    roomType,
    checkInDate,
    checkOutDate,
    guestEmail,
    guestName,
    guestPhone,
    totalPrice,
  } = req.body;

  try {
    // Get all rooms of the required type
    const rooms = await Room.find({ roomType: roomType });
    if (!rooms)
      return res.status(404).json({ error: "Room of required type not found" });

    // Get all bookings for the required room type
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

    // Check if any rooms are available
    if (availableRooms.length === 0) {
      return res.status(404).json({
        error:
          "No rooms of the required type are available for the requested dates",
      });
    }

    let newGuest;
    // Check if the user is logged in
    if (!req.user) {
      // Check for existing guest
      newGuest = await Guest.findOne({
        guestEmail: guestEmail,
        guestPhone: guestPhone,
      });

      if (!newGuest) {
        // Create a new guest
        newGuest = new Guest({
          guestEmail: guestEmail,
          guestName: guestName,
          guestPhone: guestPhone,
        });
        await newGuest.save();
      }
    }

    // Create a new booking
    const booking = new Booking({
      room: availableRooms[0]._id,
      guest: newGuest ? newGuest._id : null,
      user: req.user ? req.user.id : null,
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
    const filters = {};

    // Extract filters from query parameters
    // Filter by user
    if (req.query.user) {
      // Get users matching the query
      const users = await User.find({
        $or: [
          { fullName: { $regex: req.query.user, $options: "i" } },
          { email: { $regex: req.query.user, $options: "i" } },
        ],
      });

      // Get user IDs
      const userIds = users.map((user) => user._id);

      // Get guests matching the query
      const guests = await Guest.find({
        $or: [
          { guestName: { $regex: req.query.user, $options: "i" } },
          { guestEmail: { $regex: req.query.user, $options: "i" } },
        ],
      });

      // Get guest IDs
      const guestIds = guests.map((guest) => guest._id);

      // Filter bookings by user and guest IDs
      filters.$or = [{ user: { $in: userIds } }, { guest: { $in: guestIds } }];
    }

    // Filter by status
    if (req.query.status) {
      filters.status = req.query.status;
    }

    // Filter by room type
    if (req.query.roomType) {
      const rooms = await Room.find({ roomType: req.query.roomType });
      filters.room = { $in: rooms.map((room) => room._id) };
    }

    // Find rooms based on filters and join with the user and room
    const bookings = await Booking.find(filters)
      .populate("user")
      .populate("guest")
      .populate("room");

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

// Get new bookings from the last 7 days
const getNewBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      createdAt: { $gte: new Date() - 7 * 24 * 60 * 60 * 1000 },
    });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get latest bookings (updated in the last 7 days)
const getLatestUpdate = async (req, res) => {
  try {
    const bookings = await Booking.find({
      updatedAt: { $gte: new Date() - 7 * 24 * 60 * 60 * 1000 },
    })
      .populate("user")
      .populate("guest");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the bookings which is not checked out
const getNotCheckedOutBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      $and: [
        { checkInDate: { $lt: today } },
        { checkOutDate: { $gte: today } },
      ],
    });
    res.status(200).json(bookings);
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
    res.status(500).json({ error: error.message });
  }
};

// Get Room Availability
const getRoomAvailability = async (req, res) => {
  try {
    const rooms = await Room.find();

    // Get all bookings for today
    const bookedRooms = await Booking.find({
      checkInDate: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    const bookedRoomsId = bookedRooms.map((booked) => booked.room);

    // Get the rooms that are occupied today
    const occupiedRooms = await Booking.find({
      $and: [
        { checkInDate: { $lt: today } },
        { checkOutDate: { $gte: today } },
      ],
    });

    const occupiedRoomsId = occupiedRooms.map((occupied) => occupied.room);

    // Get the rooms that are available today
    let availableRooms = rooms.filter((room) => {
      const isBooked = bookedRoomsId.some((bookedId) =>
        bookedId.equals(room._id)
      );
      if (isBooked) return false;

      const isOccupied = occupiedRoomsId.some((occupied) =>
        occupied.equals(room._id)
      );
      return !isOccupied;
    });

    res.status(200).json({ occupiedRooms, availableRooms, bookedRooms });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  getNewBookings,
  getNotCheckedOutBookings,
  getLatestUpdate,
  updateBookingById,
  deleteBookingById,
  checkRoomAvailability,
  getAvailableRoom,
  getRoomAvailability,
};
