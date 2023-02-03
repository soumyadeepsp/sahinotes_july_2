const User = require('../models/users');

module.exports.profile = function (req, res) {
    return res.render('profile');
}

module.exports.signin = function(req, res) {
    return res.render('signin');
}

module.exports.signup = function(req, res) {
    return res.render('signup');
}

module.exports.create = (req, res) =>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var confirm_password = req.body.confirm_password;
    if (password==confirm_password) {
        // create new entry in the database
        User.create({
            name: name,
            email: email,
            password: password,
        }, function(err, user) {
            if (err) {
                console.log('Error in createing new user: ', err); return;
            }
            console.log(user);
        });
        return res.render('signin');
    } else {
        return res.redirect('back');
    }
}

// function profile(req, res) {
//     return res.render('profile');
// }

// function profile2(req, res) {
//     return res.render('profile2');
// }

// class A {
//     constructor(profile, profile2) {
//       this.profile = profile;
//       this.profile2 = profile2;
//     }
// }
// var usersController = new A(profile, profile2);
// console.log("inside controller file => ", usersController);
// exports.module = usersController;