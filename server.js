const express = require("express");
const app = express();
const path = require("path");
//const mongoose_route = require("./Route/mongoose")   all routes are now according to mysql
const mysql_route = require("./mysql/mysql-page");
const con = require("./mysql/mysql-connection-session");

const port = process.env.PORT || 5400;
const bodyParser = require("body-parser");
const session = require('express-session');
const cookie_parser = require("cookie-parser");
const passport = require('passport');
// const multer = require("multer");
app.use(express.static(path.join(__dirname, "\\Public\\")));
app.use(express.static(path.join(__dirname, "\\login-signup\\")))

app.use(cookie_parser());
// app.use(multer);     used for uploadin multipart/form-data in forms like videos etc
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var MySQLStore = require('express-mysql-session')(session);
 
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'book_store'
};
 
var sessionStore = new MySQLStore(options);
 
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
//middleware to be used for passport 
app.use(passport.initialize());
app.use(passport.session());


//function containing login query
require("./passport")(passport);


//middle ware to be used for checking if used is already logged in and trying to used signin or signup form
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        console.log(req.user.usr_nm, " has logged");
        return next();
    }
    else 
        res.redirect("/signup");
};

//check if the used is trying to access something for which he has to register
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return res.send("your are already authenticated");
    else next();    
};


app.get("/", checkAuthenticated, (req, res) => { res.send("pls redirect yourself"); });


//dont used (req,res)=>{passport.authenticat()} will cause an error
app.post("/authenticate/", passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/bookentry');
        console.log(req.user);

    }
);


app.get("/logout",checkAuthenticated, (req, res) => { 
    con.query(`delete  FROM sessions where session_id ="${req.cookies.session_cookie_name.slice(2,32+2)}"`, (err, result, fields) => {

        if (err) {
            console.log(err);
            res.send(err);
        }

        else {
            console.log("user with cookes",req.cookies.session_cookie_name.slice(2,32+2)," removed");
            res.send("out now");

        }
    });  });


app.use("/signup/", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "Public", "login-signup", "signup.html"));
});
app.use("/signup_fail/", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "Public", "login-signup", "signup_fail.html"));
});

app.use("/login/", checkNotAuthenticated,(req, res, next) => {
    console.log(req.user);
    res.sendFile(path.resolve(__dirname, "Public", "login-signup", "login.html"));
});


app.use("/login_fail/",checkNotAuthenticated, (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "Public", "login-signup", "login_fail.html"));
});

app.use("/book_search/", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "Public", "login-signup", "book-search.html"));
});

app.use("/book_advance/", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "Public", "login-signup", __dirname + "book-search-advance.html"));
});

app.use("/mongo", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "View", "Search_book.html"));
});

//app.use("/mongoose", mongoose_route);


app.use("/bookentry/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "View", "book_entry.html"));
});


app.use("/mysql", mysql_route);




app.use("/signup", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "View", "signup.html"));
});


app.use("/homepage/s", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "View", "userhomepage.html"));
});



app.listen(port, () => { console.log(`listining on port ${port}`); });

