const express       = require("express"),
      router        = express.Router(),
      Campground    = require("../models/campground")

// INDEX – Show campgrounds
router.get("/", (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
      err ? console.log(err) : res.render("campgrounds/index", {campgrounds: allCampgrounds});
  });
});

// CREATE – Add new campground to database
router.post("/", isLoggedIn, (req, res) => {
  // Get data from form and add to campgrounds array
  const campground = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
    author: {
      id: req.user._id,
      username: req.user.username
    }
  }
  // Create a new campground and save to DB
  Campground.create(campground, (err, newlyCreated) => {
      // Redirect back to campgrounds page
      err ? console.log(err) : res.redirect("/campgrounds");
  });
});

// NEW – Show form to create a new campground
router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

// SHOW – Show info about one campground
router.get("/:id", (req, res) => {
  // Find campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
      // Render show template with that campground
      err ? console.log(err) : res.render("campgrounds/show", {campground: foundCampground, user: req.user});
  });
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
