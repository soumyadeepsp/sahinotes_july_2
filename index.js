const express = require("express");
const app = express();

app.listen(8000, function(err) {
    if (err) {console.log("Error in starting the server: ", err); return;}
    console.log("Server is running on 8000");
});