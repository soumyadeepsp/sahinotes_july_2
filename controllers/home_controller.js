const User = require('../models/users');

module.exports.home = async function (req, res) {
    var Users;
    try {
        Users = await User.find({});
        var temp = [];
        for (var i=0; i<Users.length; i++) {
            temp.push({
                id: Users[i]._id,
                name: Users[i].name,
                email: Users[i].email
            });
        }
        console.log(temp);
    } catch(err) {
        console.log('Error in finding all users: ', err);
    }
    // User.find({}, function(err, user) {
    //     if (err) {console.log('Error in finding all users: ', err); return;}
    //     Users = user;
    // });
    return res.render('home', {
        users_list: temp
    });
}