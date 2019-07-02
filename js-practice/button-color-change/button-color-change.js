var body = document.querySelector("body");
var button = document.querySelector("#color-changer");

// function changeColor(){
//     if(body.style.background === "purple"){
//         body.style.background = "white";
//     }
//     else {
//         body.style.background = "purple"
//     }
// }

// button.addEventListener("click", changeColor);

button.addEventListener("click", function(){
    document.body.classList.toggle("purple");
});
