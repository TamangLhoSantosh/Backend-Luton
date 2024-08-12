const express = require("express");
const router = express.Router();
const {
  subscribeUser,
  unsubscribeUser,
} = require("../controllers/SubscribedController");

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

module.exports = router;
