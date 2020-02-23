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

// EDIT - Show a page to edit a comment
router.get("/:comment_id/edit", checkCommentOwnership, async (req, res) => {
    try {
        campground = await Campground.findById(req.params.id);
        comment = await Comment.findById(req.params.comment_id);
        res.render("comments/edit", {comment: comment, campground: campground});
    } catch(err) {
        console.log(err);
        res.redirect(`/campgrounds/${campground._id}`);
    }
});

// UPDATE - Save edited comment to db
router.put("/:comment_id/edit", checkCommentOwnership, async (req, res) => {
    try {
        campground = await Campground.findById(req.params.id);
        comment = await Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment);
        res.redirect(`/campgrounds/${campground._id}`);
    } catch(err) {
        res.render("Comment couldn't be saved. /:");
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

// Owner check middleware
function checkCommentOwnership(req, res, next){
    (req.isAuthenticated())
    ? Comment.findById(req.params.comment_id, (err, comment) => {
        try {
            (comment.author.id.equals(req.user._id))
                ? next()
                : res.redirect("back")
        } catch(err) {
            res.redirect("back")
        }
    })
    : res.redirect("back");
}

module.exports = router;
