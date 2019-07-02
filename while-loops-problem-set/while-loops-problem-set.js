var probOne = -10;
var probOneList = [];
var probTwo = 10;
var probTwoList = [];
var probThree = 8;
var probThreeList = [];
var probFour = 5;
var probFourList = [];

//Problem One
while(probOne < 19) {
    if(probOne > -10){
        probOneList.push(probOne);
    }
    probOne++;
}
document.getElementsByClassName("prob-one")[0].innerHTML = probOneList;

//Problem Two
while(probTwo < 40) {
    probTwoList.push(probTwo);
    probTwo+=2;
}
document.getElementsByClassName("prob-two")[0].innerHTML = probTwoList;

//Problem Three
while(probThree < 333) {
    if(probThree % 2 !== 0 && probThree > 300){
        probThreeList.push(probThree);
    }
    probThree++;
}
document.getElementsByClassName("prob-three")[0].innerHTML = probThreeList;

//Problem Four
while(probFour < 50) {
    if(probFour % 5 === 0 && probFour % 3 === 0 && probFour > 5){
        probFourList.push(probFour);
    }
    probFour++;
}
document.getElementsByClassName("prob-four")[0].innerHTML = probFourList;
