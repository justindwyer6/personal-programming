const Campground = require("../models/campground"),
      Comment    = require("../models/comment")

const middlewareObject = {};

middlewareObject.checkCampgroundOwnership = (req, res, next) => {
    (req.isAuthenticated())
    ? Campground.findById(req.params.id, (err, campground) => {
        try {
            (campground.author.id.equals(req.user._id))
                ? next()
                : res.redirect("back")
        } catch(err) {
            res.redirect("back")
        }
    })
    : res.redirect("back");
}

middlewareObject.checkCommentOwnership = (req, res, next) => {
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

middlewareObject.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = middlewareObject;
