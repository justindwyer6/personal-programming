// Function for even numbers.
function isEven(x) {
    evenness = x % 2 === 0;
    console.log(evenness);
    return evenness;
}

document.getElementsByTagName("h1")[0].innerHTML = isEven(prompt("Gimme a number and I'll tell you if it's even."));

// Function for factorials.
function factorial(preFac) {
    // for(x = preFac; x >= 0; x--) {
    //     if(x === 0) {
    //         return 1;
    //     }
    //     if(x === preFac) {
    //         facMid = 1;
    //     }
    //     facMid *= x;
    //     if(x === 1) {
    //         facFinish = x * facMid;
    //         console.log(facFinish);
    //         return facFinish;
    //     }
    // }
    var result = 1;
    for(var i = 2; i <= preFac; i++){
        result *= i;
    }
    return result;
}

document.getElementsByTagName("h1")[1].innerHTML = factorial(prompt("Hit me with a positive number and I'll factorial that business."));

//Function for kebab to snake case.
function kebabToSnake(kebabStr) {
    if(kebabStr.match("-") == null){
        console.log("That ain't a kebab!")
        return "That ain't a kebab!"
    }
    snakeStr = kebabStr.replace(/-/g, "_");
    console.log(snakeStr);
    return snakeStr;
}

document.getElementsByTagName("h1")[2].innerHTML = kebabToSnake(prompt("Throw a kebab-style-string at me so's I can snake_that_sh_t."));
