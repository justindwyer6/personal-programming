var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// Adding a new cat to the DB.

// var george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save((err, cat) => {
//     if (err) {
//         console.log("Uh oh, something went wrong.")
//     } else {
//         console.log(`\nWe saved ${cat.name} to the database!`);
//     }
// });

Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "Bland"
}, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log(cat);
    }
});

// Retrieve all cats from the DB and console.log each one.

Cat.find({}, (err, cats) => {
    if(err){
        console.log("Shootskis! That's an error.")
        console.log(err);
    } else {
        console.log("Here's every cat ever always...");
        console.log(cats);
    }
});
