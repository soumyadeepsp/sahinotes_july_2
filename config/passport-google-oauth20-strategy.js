var GOOGLE_CLIENT_ID = "1004388835127-uu2n1smon2nfclg8oh4ah0q5r9mmvhtl.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "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";
const User = require('../models/users');
const passport = require('passport');

var GoogleStrategy = require('passport-google-oauth20').Strategy;

function generatePassword() {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
    }
    return password;
}

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/users/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    User.findOne({email: profile.emails[0].value}, function (err, user) {
        if (err) {
            console.log('Error in finding user in google auth: ', err); return cb(err, null);
        }
        if (user) {
            return cb(null, user);
        }
        User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: generatePassword(),
        }, function(err, user) {
            if (err) {
                console.log('Error in creating user in google auth: ', err); return cb(err, null);
            }
            return cb(null, user);
        })
    });
  }
));