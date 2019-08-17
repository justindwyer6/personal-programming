// Show todo input.
$("#showForm").click(function() {
    $("input").fadeToggle();
    $("h1").addClass("h1Border");
    if($("li").length === 0) {
        $("h1").removeClass("h1Border");
    }
});

// Add a new todo.
$("input[type='text']").keypress(function() {
    if(event.which === 13) {
        if(!($(this).val() === "")) {
            $("ul").append(`<li><span><i class="far fa-trash-alt"></i></span> ${$(this).val()}</li>`);
            $(this).val("");
            if($("li").length === 1) {
                $("input").css("border-radius", "initial");
            }
        }
    }
});

// Check off a todo.
$("ul").on("click", "li", function() {
    $(this).toggleClass("complete");
});

// Delete a todo.
$("ul").on("click", "span", function() {
        $(this).parent().slideUp(400, function() {
                $(this).remove();
                if($("li").length === 0) {
                    $("input").css("border-radius", "0 0 19px 19px");
                    $("h1").removeClass("h1Border");
                }
        });
        event.stopPropagation();
});
