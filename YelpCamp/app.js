const express       = require("express"),
      app           = express(),
      bodyParser    = require("body-parser"),
      mongoose      = require("mongoose"),
      Campground    = require("./models/campground"),
      Comment       = require("./models/comment"),
      seedDB        = require("./seeds"),
      passport      = require("passport"),
      localStrategy = require("passport-local"),
      User          = require("./models/user")

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/public`))
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "I like to eat tacos and nachos late at night when no one is watching.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

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
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        err ? console.log(err) : res.render("comments/new", {campground: foundCampground});
    });
});

// CREATE - Add a new comment to a campground
app.post("/campgrounds/:id/comments", isLoggedIn, async (req, res) => {
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

// ===========
// AUTH ROUTES
// ===========
// Show registration form
app.get("/register", (req, res) => {
    res.render("register");
});

// Submit registration form
app.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.send("Something went wrong! Go back to try again.");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/campgrounds");
        });
    });
});

// Show login form
app.get("/login", (req, res) => {
    res.render("login");
});

// Submit login form
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}));

// Handle logout
app.get("/logout", (req, res) => {
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

// Listener
const port = 3000;
app.listen(3000, () => {
    console.log(`We're camped out at port ${port}.`);
});
