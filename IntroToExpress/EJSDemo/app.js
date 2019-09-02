var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/fallinlovewith/:thing", (req, res) => {
    var thing = req.params.thing;
    res.render("love", {thing: thing});
});

app.get("/posts", (req, res) => {
    var posts = [
        {title: "Eagle Screech Lessons", author: "Suzy"},
        {title: "Flaming Tiger Training", author: "Joan"},
        {title: "Orange Moose 101", author: "Carl"},
    ];

    res.render("posts", {posts: posts});
});

const port = 3000;
app.listen(port, () => {
    console.log(`Ya, I hear ya on port ${port}. Here's yer stuff.`);
});
