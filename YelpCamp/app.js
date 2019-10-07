const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

const campgrounds = [
    {name: "Giant Gap Campground", image: "https://s3-media3.fl.yelpcdn.com/bphoto/457gaj8hIgzdEKWZIarf_A/o.jpg"},
    {name: "Wolf Creek Campground", image: "https://s3-media2.fl.yelpcdn.com/bphoto/DP1cU6yEAmLKRY34Sh8B8Q/o.jpg"},
    {name: "Dutch Flat RV Resort", image: "https://s3-media4.fl.yelpcdn.com/bphoto/35xqB-95HpiBaPYCfi4rrg/o.jpg"}
];

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", (req, res) => {
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new.ejs");
});

const port = 3000;
app.listen(3000, () => {
    console.log(`We're camped out at port ${port}.`);
});
