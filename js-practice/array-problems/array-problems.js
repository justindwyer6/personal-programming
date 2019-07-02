var arrayPlay = [];

while(arrayItem !== "quit") {
    var arrayItem = prompt("Enter a value to add it to the array.\n\nType 'quit' when you're done adding values, then go to the Console (option+command+j) to play with your array.\n");
    if(arrayItem !== "quit") {
        arrayPlay.push(parseInt(arrayItem));
    }
}

// Print Reverse
function printReverse() {
    arrayPlay.forEach(function(pr, prIndex) {
        console.log(arrayPlay[(arrayPlay.length - 1) - prIndex]);
    });
}

// Uniform
// function isUniform() {
//     arrayPlay.forEach(function(iu, iuIndex) {
//         console.log(iuIndex);
//         if(iuIndex === 0) {
//             console.log("You're good...");
//         }
//         else if(iu === arrayPlay[iuIndex - 1]) {
//             console.log("You're good...");
//             if(iuIndex === arrayPlay.length - 1) {
//                 console.log("This array is uniform, through and through.");
//                 return true;
//             }
//         }
//         else {
//             console.log("This array broke uniformity at index " + iuIndex + ".");
//             return false;
//         }
//     });
// }
// Turns out forEach loops can't be broken.
function isUniform() {
    for(arrayIndex = 1; arrayIndex <= arrayPlay.length - 1; arrayIndex++) {
        if(arrayIndex === 0) {
            console.log("You're good...");
        }
        else if(arrayPlay[arrayIndex] === arrayPlay[arrayIndex - 1]) {
            if(arrayIndex === arrayPlay.length - 1) {
                console.log("This array is uniform, through and through.");
                return true;
            }
            console.log("You're good...");
        }
        else {
            console.log("This array broke uniformity at index " + arrayIndex + ".");
            return false;
        }
    }
}

function sumArray() {
    var cumulativeTotal = 0;
    arrayPlay.forEach(function(value) {
        cumulativeTotal += value;
    });
    return cumulativeTotal;
}

function max() {
    var biggest = arrayPlay[0];
    arrayPlay.forEach(function(currentValue) {
        if(currentValue > biggest) {
            biggest = currentValue;
        }
    });
    return biggest;
}
