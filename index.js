const express = require("express");
const app = express();
const expressEjsLayouts = require("express-ejs-layouts");
require('./config/mongoose');

app.use(expressEjsLayouts);
app.use("/", require("./routes/index.js"));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static('./assets'));

app.listen(8000, function(err) {
    if (err) {console.log("Error in starting the server: ", err); return;}
    console.log("Server is running on 8000");
});