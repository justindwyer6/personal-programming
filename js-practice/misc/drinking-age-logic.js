age = Number(prompt("'ow old are ye, ya wee lad?"))
if(age < 0){
	console.log("Ye can't drink if ya h'aint been born, hear?")
}
else if(age < 18){
	console.log("Off with ye, ya bilge rat!")
}
else if(age === 21){
	console.log("Well, me lad, yer first 'un's on me, eh!")
}
else if(age > 21){
	console.log("'Ave a mighty nice time. But no roughin' about in the loo...")
}
if(age % 2 == 1){
	console.log("Yer an odd 'un, aint ya?")
}
if((age ** (1/2)) % 1 == 0){
	console.log("Ah, a golden year t'be livin'!")
}
