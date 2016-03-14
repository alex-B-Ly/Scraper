var express = require('express');
var router = express.Router();

// ROUTE OBJECTS
var Entrepreneur = require('../models/entrepreneur.js');

// ROUTES
router.get('/', function(req, res){
  res.render('home', {title: 'Alex\'s scraper'});
});

// TODO Need to change route to post
router.get('/create', function(req,res){
  var entTitle = {title:'ok', link: 'www.works.com'};
  var entrep = new Entrepreneur(entTitle);

  entrep.save(entTitle);
  res.redirect('/entrepreneur');
});

router.get('/entrepreneur', function(req, res){
  Entrepreneur.find({}, function(err, doc){
    if(err){
      res.send(err);
    }else{
      res.send(doc);
    }
  });
});

module.exports = router;