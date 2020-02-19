const express               = require("express"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      bodyParser            = require("body-parser"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      User                  = require("./models/user");

mongoose.connect("mongodb://localhost/auth_demo_app", {useNewUrlParser: true, useUnifiedTopology: true});

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
  secret: "Little Jimbob ain't gonna find no burritos here, but maybe something else...",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ======
// ROUTES
// ======

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) => {
  res.render("secret");
});

// Auth Routes

// show sign up form
app.get("/register", (req, res) => {
  res.render("register");
})
// handle user sign up
app.post("/register", (req, res) => {
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if(err){
      console.log(err);
      return res.render('register');
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/secret");
    });
  });
});

// show login page
app.get("/login", (req, res) => {
  res.render("login");
});
// handle user login
app.post("/login", passport.authenticate("local", {
  successRedirect: "/secret",
  failureRedirect: "/login"
}), (req, res) => {
//left blank intentionally
});

// handle user logout
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
    res.redirect("/login");
}

const port = 3000
app.listen(port, () => {
  console.log(`AuthDemo listening at port ${port}!`)
});
