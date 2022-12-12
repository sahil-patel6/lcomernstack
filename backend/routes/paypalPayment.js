const express = require("express");
const router = express.Router();
const { getToken, processPayment } = require("../controllers/paypalPayment");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.get(
    "/paypalPayment/gettoken/:userId",
    isSignedIn,
    isAuthenticated,
    getToken
);
router.post(
    "/paypalpayment/braintree/:userId",
    isSignedIn,
    isAuthenticated,
    processPayment
);
module.exports = router;
