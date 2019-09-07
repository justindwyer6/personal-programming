const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
})

const port = 3000;
app.listen(3000, () => {
    console.log(`We're camped out at port ${port}.`);
});
