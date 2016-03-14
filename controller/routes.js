var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// ROUTE OBJECTS
var Entrepreneur = require('../models/entrepreneur.js');

// ROUTES
router.get('/', function(req, res){
  res.render('home', {title: 'Alex\'s scraper'});
});

router.get('/create', function(req,res){
  var ent = {title:'How to live life like everyone else', link: 'www.whatawaste.com'};
  var entrep = new Entrepreneur(ent);

  entrep.save(ent);
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