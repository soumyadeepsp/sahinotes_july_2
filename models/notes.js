const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {type: String, require: true},
    about: {type: String, require: true},
    filepath: {type: String, require: true},
    file: {type: String, require: true},
    author: {type: mongoose.Schema.Types.ObjectId, require: true}
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;