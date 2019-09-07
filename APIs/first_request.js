// const request = require("request");
// request("https://www.google.com", (error, response, body) => {
//     if(error) {
//         console.log("Uh oh, an error occurred.");
//         console.log(error);
//     }
//     else {
//         if(response.statusCode == 200) {
//             console.log(body);
//         }
//     }
// });

// const request = require("request");
// request("https://jsonplaceholder.typicode.com/users/1", (error, response, body) => {
//     if(!error && response.statusCode == 200) {
//         const parsedData = JSON.parse(body);
//         console.log(`${parsedData["name"]} lives in ${parsedData["address"]["city"]}.`);
//     }
// });

const rp = require("request-promise");
rp("https://jsonplaceholder.typicode.com/users/1")
    .then((body) => {
        const parsedData = JSON.parse(body);
        console.log(`${parsedData["name"]} lives in ${parsedData["address"]["city"]}.`);
    })
    .catch((err) => {
        console.log("Error!", err);
    });
