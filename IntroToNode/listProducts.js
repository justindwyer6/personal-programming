var faker = require('faker');

var welcome = "Welcome to the Fake Store!";
var eqs = "";
for(i = 0; i < welcome.length; i++){
	eqs += "=";
}
console.log(eqs + "\n" + welcome + "\n" + eqs);

var availableItems = 10;
for(i = 0; i < availableItems; i++){
	console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
}

