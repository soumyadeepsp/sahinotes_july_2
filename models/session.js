const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', require: true},
    expiry: {type: Date, require: true}
}, {
    timestamps: true
});

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;