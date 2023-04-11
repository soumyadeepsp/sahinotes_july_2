const User = require('../models/users');
const Notes = require('../models/notes');

async function checkAuthentication(id) {
    var session = await Session.findOne({user: id});
    var currentTime = new Date();
    var expiryTime = session.expiry;
    if (currentTime < expiryTime) {
        console.log('user is still logged in');
        return true;
    } else {
        console.log('user is logged out');
        return false;
    }
}

module.exports.uploadNotes = function(req, res) {
    var user_id = req.body.id;
    var isAuthenticated = checkAuthentication(user_id);
    if (isAuthenticated) {
        if (req.files) {
            var filename = req.files.note.name;
            var filepath = __dirname+'/../assets/uploads/notes/'+filename;
            const note = {
                title: filename,
                about: req.files.note.about,
                filepath: filepath,
                author: req.user._id
            }
            Notes.create(note, function(err, note) {
                if (err) {console.log('Error in creating new note: ', err); return;}
                req.files.note.mv(filepath, function(err) {
                    if (err) {
                        console.log('Error in uploading file: ', err);
                        Notes.deleteOne(note._id, function(err) {
                            if (err) {console.log('Error in deleting note: ', err); return;}
                        });
                        return res.send(err);
                    }
                    return res.redirect(`/users/profile/${user_id}`);
                });
            });
        }
    } else {
        return res.status(404).send({'success': false, message: "Please signin"});
    }
}

module.exports.viewNote = async (req, res) => {
    var user_id = req.body.id;
    var isAuthenticated = checkAuthentication(user_id);
    if (isAuthenticated) {
        var id = req.params.id;
        var note;
        try {
            note = await Notes.findById(id);
            console.log(note.title);
        } catch(err) {
            console.log('Error in finding note in viewNote: ', err); return;
        }
        return res.render('notes', {
            file_path: note.title,
            number_of_likes: note.likes.length,
            number_of_views: note.views.length
        });
    } else {
        return res.status(404).send({'success': false, message: "Please signin"});
    }
}

module.exports.likeNote = async (req, res) => {
    var user_id = req.user.id;
    var note_id = req.params.id;
    try {
        var user = await User.findById(user_id);
        if (!user.likedNotes.includes(note_id)) {
            user.likedNotes.push(note_id);
            var note = await Notes.findById(note_id);
            try {
                note.likes.push(user_id);
            } catch(err) {
                console.log('Error in liking notes: ', err);
                var index = user.likedNotes.indexOf(note_id);
                if (index>-1) {
                    user.likedNotes.splice(index, 1);
                }
                return res.json({success: false});
            }
            await note.save();
            await user.save();
            return res.json({success: true, message: "Like successful"});
        } else {
            console.log('You already liked this note!');
            return res.json({success: true, message: "Already liked"});
        }
    } catch(err) {
        console.log('Error in liking notes: ', err);
        return res.json({success: false});
    }
}

module.exports.viewNoteCount = async (req, res) => {
    var user_id = req.user.id;
    var note_id = req.params.id;
    try {
        var user = await User.findById(user_id);
        if (!user.viewedNotes.includes(note_id)) {
            user.viewedNotes.push(note_id);
            var note = await Notes.findById(note_id);
            try {
                note.views.push(user_id);
            } catch(err) {
                console.log('Error in liking notes: ', err);
                var index = user.viewedNotes.indexOf(note_id);
                if (index>-1) {
                    user.viewedNotes.splice(index, 1);
                }
                return res.json({success: false});
            }
            await note.save();
            await user.save();
            return res.json({success: true, message: "Like successful"});
        } else {
            console.log('You already liked this note!');
            return res.json({success: true, message: "Already liked"});
        }
    } catch(err) {
        console.log('Error in liking notes: ', err);
        return res.json({success: false});
    }
}