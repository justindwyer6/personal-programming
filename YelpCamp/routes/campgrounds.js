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
router.post("/", (req, res) => {
  // Get data from form and add to campgrounds array
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const newCampground = {name: name, image: image, description: description};
  // Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
      // Redirect back to campgrounds page
      err ? console.log(err) : res.redirect("/campgrounds");
  });
});

// NEW – Show form to create a new campground
router.get("/new", (req, res) => {
  res.render("campgrounds/new");
});

// SHOW – Show info about one campground
router.get("/:id", (req, res) => {
  // Find campground with provided ID
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
      // Render show template with that campground
      err ? console.log(err) : res.render("campgrounds/show", {campground: foundCampground});
  });
});

module.exports = router;
