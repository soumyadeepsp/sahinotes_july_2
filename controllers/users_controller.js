const User = require('../models/users');
const fast2sms = require('fast-two-sms');

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
    return res.redirect('profile');
}

module.exports.logout = function(req, res) {
    req.logout(function(err) {
        return res.redirect('/users/signin');
    });
}

var temp_user;

module.exports.sendOtp = async function(req, res) {
    const user_id = req.user.id;
    const mobile_number = req.params.mobile_number;
    var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    var options = {
        authorization : 'SVZdWQo2lMrjBcaughGY5Aey4CKtxqRiTnJ0m7IU6wvkDL8H3p3MvyUhaGzpqkRxrwY8iTQK649l7JOS',
        message : `Your OTP for sahinotes.com is ${otp}`,
        numbers : [mobile_number]
    }
    var output = await fast2sms.sendMessage(options);
    if (output) {
        User.findById(user_id, async function(err, user) {
            if (err) {console.log('Error in finding user in send otp: ', err); return;}
            user.mobile_otp = otp;
            user.temp_mobile = mobile_number;
            await user.save();
            temp_user = user;
            setTimeout(async function deleteotp() {
                temp_user.mobile_otp = "";
                temp_user.temp_mobile = "";
                await temp_user.save();
            }, 60*1000);
        })
        console.log("message sent successfully");
    } else {
        console.log("Error in sending sms");
    }
}

module.exports.validateOtp = function(req, res) {
    console.log("inside validate otp controller");
    const user_id = req.user.id;
    const otp = req.body.otp;
    User.findById(user_id, async function(err, user) {
        if (err) {console.log('Error in finding user in validateOtp: ', err); return;}
        if (otp==user.mobile_otp) {
            user.mobile = user.temp_mobile;
            await user.save();
        } else {
            // don't need to do anything
        }
        return res.redirect('/users/profile');
    })
}

module.exports.verifyMobile = function(req, res) {
    return res.render('verifyMobile');
}

//fast2sms API key - SVZdWQo2lMrjBcaughGY5Aey4CKtxqRiTnJ0m7IU6wvkDL8H3p3MvyUhaGzpqkRxrwY8iTQK649l7JOS

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