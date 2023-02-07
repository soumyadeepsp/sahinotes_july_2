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
    console.log(name, email, password, confirm_password);
    if (password==confirm_password) {
        // create new entry in the database
        User.create({
            name: name,
            email: email,
            password: password,
        }, function(err, user) {
            if (err) {
                console.log('Error in creating new user: ', err); return;
            }
            console.log(user);
        });
        return res.render('signin');
    } else {
        console.log("password and confirm password are not same");
        return res.redirect('back');
    }
}

module.exports.createSession = (req, res) => {
    // var email = req.body.email;
    // var password = req.body.password;
    // User.findOne({email: email}, (err, user) => {
    //     if (err) {console.log("Error in finding user in create session: ", err); return;}
    //     if (password==user.password) {
    //         return res.render('/users/profile');
    //     } else {
    //         console.log("wrong password");
    //         return res.redirect("back");
    //     }
    // })
    return res.render('/users/profile');
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