var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

// MIDDLEWARE


// ROUTES
var routes = require('./controller/routes.js');
app.use('/', routes);

app.listen(PORT, function(){
  console.log('Listening on port ',PORT);
})