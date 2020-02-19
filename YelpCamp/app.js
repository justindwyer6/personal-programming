const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      Comment    = require("./models/comment"),
      seedDB     = require("./seeds")

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`))
seedDB();

// ==============
// PRIMARY ROUTES
// ==============

app.get("/", (req, res) => {
    res.render("landing");
});

// ==================
// CAMPGROUNDS ROUTES
// ==================

// INDEX – Show campgrounds
app.get("/campgrounds", (req, res) => {
    // res.render("campgrounds", {campgrounds: campgrounds});
    Campground.find({}, (err, allCampgrounds) => {
        err ? console.log(err) : res.render("campgrounds/index", {campgrounds: allCampgrounds});
    });
});

// CREATE – Add new campground to database
app.post("/campgrounds", (req, res) => {
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
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new");
});

// SHOW – Show info about one campground
app.get("/campgrounds/:id", (req, res) => {
    // Find campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        // Render show template with that campground
        err ? console.log(err) : res.render("campgrounds/show", {campground: foundCampground});
    });
});

// ===============
// COMMENTS ROUTES
// ===============

// NEW - Show form to add a comment to a campground
app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        err ? console.log(err) : res.render("comments/new", {campground: foundCampground});
    });
});

// CREATE - Add a new comment to a campground
app.post("/campgrounds/:id/comments", async (req, res) => {
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

// ============
// OTHER ROUTES
// ============

const port = 3000;
app.listen(3000, () => {
    console.log(`We're camped out at port ${port}.`);
});
