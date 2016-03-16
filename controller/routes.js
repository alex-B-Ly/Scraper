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

router.get('/entrepreneur', function(req, res){
  res.render('entrepreneur', {title:'Open for business!'});
});

// Entrepreneur scrape route
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
  res.redirect('/');
});

// End point route to get data for entrepreneur route
router.get('/entrepreneurContent', function(req,res){
  Entrepreneur.find({}).exec(function(err, doc){
    res.json(doc);
  });
});

// End point route to get data for comments

// Comment-submit route
router.post('/comment-submit/:id', function(req, res){
  // TODO Insert into comments table using stuff below
  console.log(req.params);
  console.log(req.body);
});

// Delete title route
router.post('/delete-title', function(req, res){
  Entrepreneur.remove({_id: req.body.deleteMe}, function(err){
    if(err){
      console.log(err);
    }
  });
  res.redirect('/entrepreneur');
});

module.exports = router;