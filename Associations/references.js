var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", {useNewUrlParser: true, useUnifiedTopology: true});

var Post = require("./models/post");
var User = require("./models/user");

// Post.create({
//     title: "How to get lost in time part 4: Time's Awakening",
//     content: "Go very fast and ugghh."
// }, (err, post) => {
//     User.findOne({email: "phil@gmail.com"}, (err, foundUser) => {
//         err ? console.log(err) : (
//             foundUser.posts.push(post),
//             foundUser.save((err, data) => {
//                 err ? console.log(err) : console.log(data);
//             })
//         );
//     });
// });

//find user
//find all posts for that user

User.findOne({email: "phil@gmail.com"}).populate("posts").exec((err, user) => {
    err ? console.log(err) : console.log(user);
});
