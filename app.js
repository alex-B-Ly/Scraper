var express = require('express');
var handles = require('express-handlebars');
var app = express();
var PORT = process.env.PORT || 8080;

var mongoose = require('mongoose');

// TODO Make config work from folder
mongoose.connect('mongodb://localhost/entrepreneur_db');
var db = mongoose.connection;

// MIDDLEWARE
app.use('/static', express.static('public'));

// HANDLEBARS
app.engine('handlebars', handles({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// ROUTES
var routes = require('./controller/routes.js');
app.use('/', routes);

app.listen(PORT, function(){
  console.log('Listening on port ',PORT);
});