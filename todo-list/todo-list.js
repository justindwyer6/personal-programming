var todos = [];

window.setTimeout(function(){

var input = prompt("What do you want to do?\n'new'\nMake a new todo.\n'list'\nSee all your todos.\n'delete'\nRemove a todo.\n'quit'\nGet out of this miserable app.");

while(input !== "quit"){
    if(input === "list") {
        listTodos();
    }
    else if(input === "new") {
        addTodo();
    }
    else if(input === "delete") {
        deleteTodo();
    }
    input = prompt("Now what?\n• 'new'\n• 'list'\n• 'delete'\n• 'quit'");
}
console.log("All done, kids. Go home.")

}, 500);

function listTodos() {
    todos.forEach(function(todo, todoIndex){
        var todoListed = (todoIndex + 1) + ". " + todo;
        function starLine(){
            stars = "";
            for(x = 1; x <= todoListed.length; x++) {
                stars += "*";
            }
            console.log(stars);
        }
        starLine();
        console.log(todoListed);
        starLine();
    });
}
function addTodo() {
    var newTodo = prompt("Add a new todo.");
    console.log(newTodo + " successfully added.")
    todos.push(newTodo);
}
function deleteTodo() {
    var todoToDelete = (parseInt(prompt("Enter the todo's number to delete it.")) - 1);
    console.log(todos[todoToDelete] + " successfully deleted.")
    todos.splice((todoToDelete),1);
}
