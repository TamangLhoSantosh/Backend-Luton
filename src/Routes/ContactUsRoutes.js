const express = require("express");
const router = express.Router();
const {
  contactUs,
  getContactUs,
  getContactUsById,
} = require("../controllers/ContactUsController");
const auth = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

/**
 * @description To insert into contact us
 * @api /contact-us
 * @access PUBLIC
 * @type POST
 * @return response
 */
router.post("/", contactUs);

/**
 * @description To get all contactus
 * @api /contact-us
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.get("/", auth, authorizeRole("admin"), getContactUs);

/**
 * @description To get contactus by id
 * @api /contact-us
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.get("/:id", auth, authorizeRole("admin"), getContactUsById);

module.exports = router;
