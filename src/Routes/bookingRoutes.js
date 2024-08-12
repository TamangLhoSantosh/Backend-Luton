const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/BookingController");
const auth = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

/**
 * @description To create a new booking
 * @api /booking
 * @access PUBLIC
 * @type POST
 * @return response
 */
router.post("/", bookingController.createBooking);

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
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.get(
  "/",
  auth,
  authorizeRole("staff" || "admin"),
  bookingController.getAllBookings
);

/**
 * @description To get specific bookings
 * @api /booking/:id
 * @access PUBLIC
 * @type Get
 * @return response
 */
router.get("/:id", auth, bookingController.getBookingById);

/**
 * @description To update bookings
 * @api /booking/:id
 * @access PUBLIC
 * @type PUT
 * @return response
 */
router.put("/:id", auth, bookingController.updateBookingById);

/**
 * @description To delete bookings
 * @api /booking/:id
 * @access PUBLIC
 * @type DELETE
 * @return response
 */
router.delete("/:id", auth, bookingController.deleteBookingById);

module.exports = router;
