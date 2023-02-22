const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    mobile: {type: String},
    temp_mobile: {type: String, default: "", require: true},
    mobile_otp: {type: String, default: "", require: true}
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;