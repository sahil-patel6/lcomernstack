const express = require("express");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator");

router.get("/signout", signout);

router.post(
    "/signup",
    [
        check("name")
            .isLength({ min: 3 })
            .withMessage("name must be at least 3 chars long"),
        check("email").isEmail().withMessage("email must be valid"),
        check("plainPassword")
            .isLength({ min: 8 })
            .withMessage("password should be atleast 8 char long"),
    ],
    signup
);

router.post(
    "/signin",
    [
        check("email").isEmail().withMessage("email must be valid"),
        check("plainPassword")
            .isLength({ min: 8 })
            .withMessage("password should be atleast 8 char long"),
    ],
    signin
);

router.get("/testroute", isSignedIn, (req, res) => {
    res.send("A Protected Route");
});

module.exports = router;
