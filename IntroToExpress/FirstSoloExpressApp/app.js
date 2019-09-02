var express = require("express");
app = express();
const port = 4000;
const name = "Billy";
const animals = {
    pig: {
        name: "pig",
        says: "oink"
    },
    cow: {
        name: "cow",
        says: "moo"
    },
    dog: {
        name: "dog",
        says: "woof"
    }
}

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})

app.get("/", (req, res) => {
    res.send(`I've been expecting you, ${name}.`);
});

app.get("/name", (req, res) => {
    res.send(`Your name is ${name}, and you are <select name="smarts"><option value="dumb">Smart</option><option value="idiot">Cultured</option><option value="annoying">Emotionally Intelligent</option></select>.`);
});

app.get("/speak/:animal", (req, res) => {
    animal = req.params.animal.toLowerCase();
    const capitalize = (s) => {
        if (typeof s !== 'string') return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
    if(animals[animal] === undefined) {
        res.send(`Sorry, we don't have <b>${animal}</b> here.`);
    }
    else {
        res.send(`The ${animal} says "${capitalize(animals[animal].says)}!"`);
    }
});

app.get("/repeat/:string/:repetitions", (req, res) => {
    let repetitions = parseInt(req.params.repetitions);
    let string = `${req.params.string} `;
    if(repetitions <= 1000000) {
        for(i = 1; i < repetitions; i++){
            string += `${req.params.string} `;
        }
        res.send(string);
    }
    else {
        res.send(`That's too much ${string} for today, thank you.`);
    }
});

app.get("*", (req, res) => {
    res.send("There is nothing for you here.");
});
