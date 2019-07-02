// var answer = prompt("Are we there yet!");

// while(answer !== "yes" && answer !== "yeah"){
//     answer = prompt("Are we there yet!");
// }

// document.getElementsByTagName("H1")[0].innerHTML = "Yay, we made it!";

// Version 2
var positiveResponse = "yes";
var answer = prompt("Are we there yet!");

while(answer.indexOf(positiveResponse) === -1){
    answer = prompt("Are we there yet?");
}

document.getElementsByTagName("H1")[0].innerHTML = "Yay, we made it!";
