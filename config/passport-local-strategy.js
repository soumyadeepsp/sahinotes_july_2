const passport = require('passport');
const LocalStrategy =  require('passport-local').Strategy;
const User = require("../models/users");

passport.use(new LocalStrategy({
    usernameField: 'email',
    }, function(email, password, done) {
      console.log("inside passport local strategy");
      User.findOne({ email: email }, function (err, user) {
        if (err) { console.log("Error in passport local strategy: ", err); return done(err); }
        if (!user) { console.log("User not found: ", err); return done(null, false); }
        if (password!=user.password) { console.log("Wrong password: ", err); return done(null, false); }
        console.log("user details are correct");
        return done(null, user);
      });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (err) {
          console.log('Error in deserialising user: ', err); return done(err);
        }
        return done(null, user);
    });            
});

passport.checkAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    return res.redirect('/users/signin');
  }
}

passport.setAuthentiucatedUser = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    return next();
  } else {
    return next();
  }
}