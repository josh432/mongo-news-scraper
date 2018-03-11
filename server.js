const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const routes = require('./routes');

// const index = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 8080;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// const api_routes = require('./routes/api_routes/api_routes');
// const html_routes = require('./routes/html_routes/html_routes');
// app.use('/', html_routes);
// app.use('/', api_routes);

app.use('/', routes);

app.engine("handlebars", exphbs({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);
console.log('URI', MONGODB_URI)

app.listen(PORT, function() {
    console.log(`Listening at localhost:${PORT}`)
})

module.exports = app;