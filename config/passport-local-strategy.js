const passport = require('passport');
const LocalStrategy =  require('passport-local').Strategy;
const User = require("../models/users");

passport.use(new LocalStrategy({
    usernameField: 'email',
    }, function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { console.log("Error in passport local strategy: ", err); return done(err); }
        if (!user) { console.log("User not found: ", err); return done(null, false); }
        if (password!=user.password) { console.log("Wrong password: ", err); return done(null, false); }
        return done(null, user);
      });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.email);
});

passport.deserializeUser(function(email, done) {
    User.findOne({email: email}, function(err, user) {
        done(err, user);
    });            
});

module.exports = passport;