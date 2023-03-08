const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    mobile: {type: String},
    temp_mobile: {type: String, default: "", require: true},
    mobile_otp: {type: String, default: "", require: true},
    likedNotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}],
    viewedNotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Note'}]
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;