var secretNumber = 4;
var guessAgain = true;

while(guessAgain === true){
    var guess = Number(prompt("Guess a number!"));
    while(guess !== secretNumber) {
        if(guess > secretNumber) {
            alert("Too high, you fool.");
        }
        else if(guess == null) {
            alert("Enter something!");
        }
        else if(guess < secretNumber) {
            alert("Too low, peasant.");
        }
        guess = Number(prompt("Guess again!"));
    }
    if(guess === secretNumber) {
        guessAgain = confirm("You guessed right! Guess again?");
    }
}
// This is in progress.
