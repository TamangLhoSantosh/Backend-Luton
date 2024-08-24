const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/BookingController");
const auth = require("../middleware/authMiddleware");
const optionalAuth = require("../middleware/optionalAuthMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

/**
 * @description To create a new booking
 * @api /booking
 * @access PUBLIC
 * @type POST
 * @return response
 */
router.post("/", optionalAuth, bookingController.createBooking);

/**
 * @description To check the availability of a room
 * @api /booking/check-availability
 * @access PUBLIC
 * @type POST
 * @return response
 */
router.post("/check-availability", bookingController.checkRoomAvailability);

/**
 * @description To get all room available for provided dates
 * @api /booking/available-room
 * @access RESTRICTED TO ADMIN AND STAFF
 * @type POST
 * @return response
 */
router.post(
  "/available-room",
  auth,
  authorizeRole("staff", "admin"),
  bookingController.getAvailableRoom
);

/**
 * @description To get all bookings
 * @api /booking
 * @access RESTRICTED TO ADMIN AND STAFF
 * @type GET
 * @return response
 */
router.get(
  "/",
  auth,
  authorizeRole("staff", "admin"),
  bookingController.getAllBookings
);

/**
 * @description To get bookings from 7 days ago
 * @api /booking/new-bookings
 * @access RESTRICTED TO ADMIN AND STAFF
 * @type GET
 * @return response
 */
router.get(
  "/new-bookings",
  auth,
  authorizeRole("staff", "admin"),
  bookingController.getNewBookings
);

/**
 * @description To get bookings which is update from 7 days ago
 * @api /booking/latest-bookings
 * @access RESTRICTED TO ADMIN AND STAFF
 * @type GET
 * @return response
 */
router.get(
  "/latest-bookings",
  auth,
  authorizeRole("staff", "admin"),
  bookingController.getLatestUpdate
);

/**
 * @description To get bookings from which the user has not checked out
 * @api /booking/bookings-not-checked-out
 * @access RESTRICTED TO ADMIN AND STAFF
 * @type GET
 * @return response
 */
router.get(
  "/bookings-not-checked-out",
  auth,
  authorizeRole("staff", "admin"),
  bookingController.getNotCheckedOutBookings
);

/**
 * @description To get room availability
 * @api /booking/room-availability
 * @access RESTRICTED TO ADMIN AND STAFF
 * @type GET
 * @return response
 */
router.get(
  "/room-availability",
  auth,
  authorizeRole("staff", "admin"),
  bookingController.getRoomAvailability
);

/**
 * @description To get specific bookings
 * @api /booking/:id
 * @access RESTRICTED TO AUTHENTICATED USERS
 * @type Get
 * @return response
 */
router.get("/:id", auth, bookingController.getBookingById);

/**
 * @description To update bookings
 * @api /booking/:id
 * @access RESTRICTED TO AUTHENTICATED USERS
 * @type PUT
 * @return response
 */
router.put("/:id", auth, bookingController.updateBookingById);

/**
 * @description To delete bookings
 * @api /booking/:id
 * @access RESTRICTED TO AUTHENTICATED USERS
 * @type DELETE
 * @return response
 */
router.delete("/:id", auth, bookingController.deleteBookingById);

module.exports = router;
