var express = require("express");
var app = express();

app.get("/", (req, res) => {
    res.send("<a href='/dog'>Hi there!</a>");
});

app.get("/bye", (req, res) => {
    res.send("Peace out.");
});

app.get("/dog*", (req, res) => {
    console.log("They've found the kittens.")
    res.send("<h1><a href='/'>Meow</a></h1>");
});

app.get("/r/:subredditName", (req, res) => {
    const subreddit = req.params.subredditName;
    const capitalize = (s) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
      }
    res.send(`Welcome to ${capitalize(subreddit)} subreddit!`);
});

app.get("/r/:subredditName/comments/:id/:title", (req, res) => {
    const subreddit = req.params.subredditName;
    const capitalize = (s) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
      }
    res.send(`Hey you get some ${capitalize(subreddit)} comments now.`);
});

app.get("*", (req, res) => {
    res.send("Page not found. Sad day.");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000.")
});
