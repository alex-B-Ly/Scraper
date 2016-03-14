var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

// ROUTE OBJECTS
var Entrepreneur = require('../models/entrepreneur.js');

// ROUTES
router.get('/', function(req, res){
  res.render('home', {title: 'Alex\'s scraper'});
});

// TODO Need to change route to post
router.post('/entrepreneur-scrape', function(req,res){
  var entTitle = {title:'Donald Trump brings global peace.', link: 'www.mongohatesme.com'};
  var entrep = new Entrepreneur(entTitle);

  entrep.save(entTitle);
  res.redirect('/entrepreneur');
});

router.get('/entrepreneur', function(req, res){
  Entrepreneur.find({}, function(err, doc){
    if(err){
      res.send(err);
    }else{
      console.log(doc);
      res.send(doc);
    }
  });
});

module.exports = router;