const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/sahinotes2_development');

mongoose.connection.once('open', function() {
    console.log('Connected to mongodb database');
});