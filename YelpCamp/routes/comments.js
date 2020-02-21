const express = require("express"),
      router  = express.Router({mergeParams: true}),
      Campground = require("../models/campground"),
      Comment = require("../models/comment")

// NEW - Show form to add a comment to a campground
router.get("/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
      err ? console.log(err) : res.render("comments/new", {campground: foundCampground});
  });
});

// CREATE - Add a new comment to a campground
router.post("/", isLoggedIn, async (req, res) => {
  try {
      // Look up campground using ID
      foundCampground = await Campground.findById(req.params.id);
      newlyCreatedComment = await Comment.create(req.body.comment);
      // Connect new comment to campground
      await foundCampground.comments.push(newlyCreatedComment);
      await foundCampground.save();
      // Redirect to campground show page
      res.redirect(`/campgrounds/${foundCampground._id}`);
      }
  catch(err) {
      console.log(err);
      res.redirect("/campgrounds");
  }
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
