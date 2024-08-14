const express = require("express");
const router = express.Router();
const {
  subscribeUser,
  unsubscribeUser,
} = require("../controllers/SubscribedController");
const auth = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

/**
 * @description Subscribe a user
 * @api /subscribe
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.post("/", subscribeUser);

/**
 * @description Unsubscribe a user
 * @api /subscribe/unsubscribe
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.post("/unsubscribe", unsubscribeUser);

/**
 * @description Get all subscribed users
 * @api /subscribe
 * @access PUBLIC
 * @type GET
 * @return response
 */
router.get("/", auth, authorizeRole("admin"), unsubscribeUser);

module.exports = router;
