const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
})

app.get("/results", (req, res) => {
    const query = req.query.searchMovie;
    const url = `http://www.omdbapi.com/?apikey=thewdb&s=${query}`;
    request(url, (error, response, body) => {
        if(!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            res.render("results", {data: data, query: query});
        }
        else {
            res.send("Error!");
        }
    });
});

port = 3000;
app.listen(port, () => {
    console.log(`Cameras are rollin' on port ${port}.`);
});
