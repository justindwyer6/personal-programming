var divs = $("div");

$("button").on("click", function(){fadeElement(divs)});

function fadeElement(fading){
    fading.slideToggle(5000, function(){
        $("button").text("Fade done.");
    });
}
