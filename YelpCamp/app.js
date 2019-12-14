const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      seedDB     = require("./seeds")

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campground.create(
//     {
//         name: "Giant Gap Campground",
//         image: "https://s3-media3.fl.yelpcdn.com/bphoto/457gaj8hIgzdEKWZIarf_A/o.jpg",
//         description: "Everything your heart desires"
//     },
//     (err, campground) => {
//         err ? console.log(err) : console.log(`Newly created campground: ${campground}`);
//     });

app.get("/", (req, res) => {
    res.render("landing");
});

// const campgrounds = [
//     {name: "Giant Gap Campground", image: "https://s3-media3.fl.yelpcdn.com/bphoto/457gaj8hIgzdEKWZIarf_A/o.jpg"},
//     {name: "Wolf Creek Campground", image: "https://s3-media2.fl.yelpcdn.com/bphoto/DP1cU6yEAmLKRY34Sh8B8Q/o.jpg"},
//     {name: "Dutch Flat RV Resort", image: "https://s3-media4.fl.yelpcdn.com/bphoto/35xqB-95HpiBaPYCfi4rrg/o.jpg"}
// ];

// INDEX – Show all campgrounds
app.get("/campgrounds", (req, res) => {
    // res.render("campgrounds", {campgrounds: campgrounds});
    Campground.find({}, (err, allCampgrounds) => {
        err ? console.log(err) : res.render("index", {campgrounds: allCampgrounds});
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
    res.render("new.ejs");
});

// SHOW – Show info about one campground
app.get("/campgrounds/:id", (req, res) => {
    // Find campground with provided ID
    Campground.findById(req.params.id, (err, foundCampground) => {
        // Render show template with that campground
        err ? console.log(err) : res.render("show", {campground: foundCampground});
    });
});

const port = 3000;
app.listen(3000, () => {
    console.log(`We're camped out at port ${port}.`);
});
