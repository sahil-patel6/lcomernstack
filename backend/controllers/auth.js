const User = require("../models/user");

const { validationResult } = require("express-validator");

var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "user signed out successfully",
    });
};

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }
    console.log(req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err || !user) {
            console.log(err);
            res.status(400).json({
                error: "Not able to save user in DB",
            });
        } else {
            res.json({
                name: user.name,
                email: user.email,
                id: user._id,
            });
        }
    });
};

exports.signin = (req, res) => {
    const { email, plainPassword } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User Email Doesn't exist",
            });
        }

        if (!user.authenticate(plainPassword)) {
            return res.status(401).json({
                error: "Email and password do not match",
            });
        }
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        res.cookie("token", token, {
            expire: new Date() + 9999,
        });
        const { email, _id, name, role } = user;
        return res.status(200).json({
            token,
            user: {
                _id,
                name,
                email,
                role,
            },
        });
    });
};

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
    console.log("profile: ", req.profile, "auth", req.auth);
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED",
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not admin, ACCESS DENIED",
        });
    }
    next();
};
