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
 * @description To get all bookings
 * @api /booking
 * @access RESTRICTED TO ADMIN AND STAFF
 * @type GET
 * @return response
 */
router.post(
  "/check-availability",
  auth,
  authorizeRole("staff", "admin"),
  bookingController.getAvailableRoom
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
