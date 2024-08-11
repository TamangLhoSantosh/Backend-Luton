const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/BookingController");

/**
 * @description To create a new booking
 * @api /booking
 * @access PUBLIC
 * @type POST
 * @return response
 */
router.post("/", bookingController.createBooking);

/**
 * @description To get all bookings
 * @api /booking
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.get("/", bookingController.getAllBookings);

/**
 * @description To get specific bookings
 * @api /booking/:id
 * @access PUBLIC
 * @type Get
 * @return response
 */
router.get("/:id", bookingController.getBookingById);

/**
 * @description To update bookings
 * @api /booking/:id
 * @access PUBLIC
 * @type PUT
 * @return response
 */
router.put("/:id", bookingController.updateBookingById);

/**
 * @description To delete bookings
 * @api /booking/:id
 * @access PUBLIC
 * @type DELETE
 * @return response
 */
router.delete("/:id", bookingController.deleteBookingById);

module.exports = router;
