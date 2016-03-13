var express = require('express');
var app = express();
var PORT = process.env.PORT || 8080;

// MIDDLEWARE


// ROUTES

app.listen(PORT, function(){
  console.log('Listening on port ',PORT);
})