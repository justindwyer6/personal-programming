var numberOfSquares = 6;
var colors = [];
var pickedColor;
var round = 1;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var body = document.querySelector("body");
var title = document.querySelector("#title");
var stripe = document.querySelector("#stripe");
var newGame = document.querySelector("#newGame");
var messageDisplay = document.querySelector("#message");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
    setupModeButtons();
    setupSquares();
    resetGame();
}
newGame.addEventListener("click", resetGame);

function setupModeButtons(){
    for(var i = 0; i < modeButtons.length; i++) {
        // Difficulty button settings.
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numberOfSquares = 3: numberOfSquares = 6;
            resetGame();
        });
    }
}
function setupSquares() {
    for(var i = 0; i < squares.length; i++) {
        // Add click listeners to squares.
        squares[i].addEventListener("click", function(){
            // Get color of clicked square.
            var clickedColor = this.style.backgroundColor;
            // Compare color to pickedColor.
            if(messageDisplay.textContent === "You got it!") {
                resetGame();
            }
            else if(clickedColor === pickedColor) {
                // Winning color.
                newGame.textContent = "Play Again";
                messageDisplay.textContent = "You got it!";
                changeColors(clickedColor);
            }
            else {
                // Losing color.
                this.style.backgroundColor = body.style.backgroundColor;
                messageDisplay.textContent = "Try again!";
            }
        });
    }
}
function resetGame(){
    // Reset the game.
    colors = generateColors(numberOfSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    title.style.backgroundColor = "steelblue";
    round += 1;
    messageDisplay.textContent = "Click, you fool.";
    newGame.textContent = "New Colors";
    for(var i = 0; i < squares.length; i++) {
        // Add initial colors to squares.
        for(var i = 0; i < squares.length; i++) {
            if(colors[i]) {
                squares[i].style.display = "block";
                squares[i].style.backgroundColor = colors[i];
            }
            else {
                squares[i].style.display = "none";
            }
        }
    }
}
function changeColors(color) {
    // Change all squares (and other elements) to the winning color when it is clicked.
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
    title.style.backgroundColor = color;
}
function pickColor() {
    // Set a random color as the winning color.
    var randomColor = Math.floor(Math.random() * colors.length);
    return colors[randomColor];
}
function generateColors(numberOfColors) {
    // Create an array of random colors.
    var colorArray = [];
    for(var i = 1; i <= numberOfColors; i++) {
        colorArray.push(generateRandomColor());
    }
    return colorArray;
}
function generateRandomColor() {
    // Create one random color.
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}
