const express = require("express");
const app = express();
const expressEjsLayouts = require("express-ejs-layouts");
require('./config/mongoose');
const passport = require('passport');
require('./config/passport-local-strategy');
require('./config/passport-google-oauth20-strategy');
const expressSession = require('express-session');
const mongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(expressEjsLayouts);
app.use(expressSession({
    name: 'sahinotes',
    secret: 'sahinotes_dev',
    cookie: {
        maxAge: (24*60*60*1000)
    },
    store: mongoStore.create({
        mongoUrl: "mongodb://localhost/sahinotes2_development"
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthentiucatedUser);
app.use("/", require("./routes/index.js"));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static('./assets'));

app.listen(8000, function(err) {
    if (err) {console.log("Error in starting the server: ", err); return;}
    console.log("Server is running on 8000");
});