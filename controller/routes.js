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

// Enterpreneur scrape route
router.post('/entrepreneur-scrape', function(req,res){
  
  request('https://www.reddit.com/r/entrepreneur/', function(err, response, stuff){
    var data = cheerio.load(stuff);
    data('.title').each(function(i, element){
      var title = data(this).children('a').text();
      var link = 'https://www.reddit.com'+data(this).children('a').attr('href');
      
      if(title && link){
        var entTitle = {title, link};
        var entrep = new Entrepreneur(entTitle);
        entrep.save(entTitle);
      }
    });
  });  
  
  res.redirect('/entrepreneur');
});

router.get('/entrepreneur', function(req, res){
  Entrepreneur.find({}).exec(function(err, doc){
    if(err){
      res.send(err);
    }else{
      res.render('entrepreneur', {doc});
    }
  });
});

module.exports = router;