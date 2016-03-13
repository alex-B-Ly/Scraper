var express = require('express');
var router = express.Router();

// ROUTE OBJECTS

// ROUTES
router.get('/', function(req, res){
  res.render('home', {title: 'Alex\'s scraper'});
});

module.exports = router;