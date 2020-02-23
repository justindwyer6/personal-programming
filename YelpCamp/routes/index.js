const express  = require("express"),
      router   = express.Router(),
      passport = require("passport"),
      User     = require("../models/user")

// ==============
// PRIMARY ROUTES
// ==============
router.get("/", (req, res) => {
    res.render("landing");
});

// ===========
// AUTH ROUTES
// ===========
// Show registration form
router.get("/register", (req, res) => {
    res.render("register");
});

// Submit registration form
router.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            return res.send("Something went wrong! Go back to try again.");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
router.get("/login", (req, res) => {
    res.render("login");
});

// Submit login form
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}));

// Handle logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});

// ==========
// OTHER CODE
// ==========
// Login check middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
