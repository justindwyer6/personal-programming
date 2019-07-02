function dotdot() {
    var dot = document.querySelector("#dot");
    var dotBox = document.querySelector("#dotbox");
    if(dot.innerHTML.indexOf("...") != -1) {
        dotBox.style.display = "block";
    }
    else {
        dot.innerHTML += ".";
    }
}
