const express = require("express");
const app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

let friends = ["Timmy", "Sally", "Carlos", "Izuki"];

app.get("/", (req, res) => {
    res.render("home");
});

app.post("/addfriend", (req, res) => {
    let newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", (req, res) => {
    res.render("friends", {friends: friends});
});

const port = 3000;
app.listen(port, () => {
    console.log("Jumbo Jack, we copy.")
});
