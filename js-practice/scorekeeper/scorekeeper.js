var p1Button = document.querySelector("#p1");
var p2Button = document.querySelector("#p2");
var resetButton = document.querySelector("#reset");
var h1 = document.querySelector("h1");
var p1Display = document.querySelector("#p1Display");
var p2Display = document.querySelector("#p2Display");
var winningScoreInput = document.querySelector("#winning-score-input");
var winningScoreDisplay = document.querySelector("#winning-score-display");
var p1Score = 0;
var p2Score = 0;
var gameOver = false;
var winningScore = 5;

function buttonLogic(playerButton, playerScore, playerDisplay){
    playerButton.addEventListener("click", function(){
        if(!gameOver){
            playerScore++;
            if(playerScore === winningScore){
                playerDisplay.classList.add("winner");
                gameOver = true;
            }
            playerDisplay.textContent = playerScore;
        }
    });
}

function reset(){
    p1Score = 0;
    p2Score = 0;
    p1Display.classList.remove("winner");
    p2Display.classList.remove("winner");
    p1Display.textContent = p1Score;
    p2Display.textContent = p2Score;
    gameOver = false;
    buttonLogic(p1Button, p1Score, p1Display);
    buttonLogic(p2Button, p2Score, p2Display);
}

buttonLogic(p1Button, p1Score, p1Display);
buttonLogic(p2Button, p2Score, p2Display);

resetButton.addEventListener("click", function(){
    reset();
});

winningScoreInput.addEventListener("change", function(){
    winningScoreDisplay.textContent = this.value;
    winningScore = Number(this.value);
    reset();
});
