var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useNewUrlParser: true, useUnifiedTopology: true});

// POST - title, content
var postSchema = new mongoose.Schema({
    title: String,
    content: String
});

var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});

var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "steve@brown.edu",
//     name: "Steve Jones"
// });

// newUser.posts.push({
//     title: "How to be normal",
//     content: "Be me."
// })

// newUser.save((err, user)=>{
//     if(err){
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "Apples are very tasty if you're into that kind of thing."
// });

// newPost.save((err, post)=>{
//     if(err){
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

User.findOne({name: "Steve Jones"}, (err, user)=>{
    if(err){
        console.log(err);
    } else {
        // user.posts.push({
        //     title: "Sea Dogs who ain't salty",
        //     content: "Taco salad makes it good."
        // });
        // user.save((err, user)=>{
        //     if(err){
        //         console.log(err);
        //     } else {
        //         console.log(user);
        //     }
        // });
        console.log(user);
    }
});
