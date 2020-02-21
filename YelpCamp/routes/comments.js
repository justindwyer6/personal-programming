const express = require("express"),
      router  = express.Router({mergeParams: true}),
      Campground = require("../models/campground"),
      Comment = require("../models/comment")

// NEW - Show form to add a comment to a campground
router.get("/new", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
      err ? console.log(err) : res.render("comments/new", {campground: campground});
  });
});

// CREATE - Add a new comment to a campground
router.post("/", isLoggedIn, async (req, res) => {
  try {
      // Look up campground using ID
      campground = await Campground.findById(req.params.id);
      comment = await Comment.create(req.body.comment);
      // Associate user with comment
      comment.author.id = await req.user._id;
      comment.author.username = await req.user.username;
      // Save comment
      await comment.save();
      await campground.comments.push(comment);
      await campground.save();
      res.redirect(`/campgrounds/${campground._id}`);
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
