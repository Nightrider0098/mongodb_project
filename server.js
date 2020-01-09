const express = require("express");
const app = express();
const path = require("path");
//const mongoose_route = require("./Route/mongoose")
const mysql_route = require("./mysql/mysql-page");
const port = process.env.PORT || 5400;
const bodyParser = require("body-parser");
const authRouter = require("./mysql/auth");

const session = require('express-session');
const passport = require('passport');
require('/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "\\Public\\")));
app.use(express.static(path.join(__dirname,"\\login-signup\\")))
app.use(session({
 secret:"thesecret",
saveUninitialized:false,
resave:false}));










app.use("/signup/", (req, res, next) => {
    res.sendFile(path.resolve(__dirname,"Public","login-signup","signup.html")); 
});
app.use("/signup_fail/", (req, res, next) => {
    res.sendFile(path.resolve(__dirname,"Public","login-signup","signup_fail.html")); 
});

app.use("/login/", (req, res, next) => {
    res.sendFile(path.resolve(__dirname,"Public","login-signup","login.html")); 
});


app.use("/login_fail/", (req, res, next) => {
    res.sendFile(path.resolve(__dirname,"Public","login-signup","login_fail.html")); 
});

app.use("/book_search/", (req, res, next) => {
    res.sendFile(path.resolve(__dirname,"Public","login-signup","book-search.html")); 
});

app.use("/book_advance/", (req, res, next) => {
    res.sendFile(path.resolve(__dirname,"Public","login-signup",__dirname+"book-search-advance.html")); 
});

app.use("/mongo", (req, res, next) => {
    res.sendFile(path.resolve(__dirname,"View","Search_book.html"));
});

//app.use("/mongoose", mongoose_route);


app.use("/bookentry/", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"View","book_entry.html"));
});


app.use("/mysql", mysql_route);




app.use("/signup", (req, res, next) => {
    res.sendFile(path.resolve(__dirname,"View","signup.html")); 
});


app.use("/homepage/s", (req, res, next) => {
    res.sendFile(path.resolve(__dirname,"View","userhomepage.html"));
});



app.listen(port, () => { console.log(`listining on port ${port}`); });

