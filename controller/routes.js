var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

// ROUTE OBJECTS
var Entrepreneur = require('../models/entrepreneur.js');
var Comment = require('../models/entrepreneurComments');

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
  Entrepreneur.find({}).sort({dateUpdated:-1}).exec(function(err, doc){
    res.json(doc);
  });
});

// End point route to get data for comments

// Comment-submit route
router.post('/comment-submit/:id', function(req, res){
  var newComment = new Comment(req.body);
  var titleId = req.params.id;

  newComment.save(function(err, dbComment){
    if(err){
      res.send(err);
    }else{
      Entrepreneur.findOneAndUpdate({'_id':titleId},
        {'dateUpdated': Date.now() ,$push: {'comments': dbComment.comment}},
        {new:true},
        function(err, dbTitle){
          if(err){
            console.log(err);
          }else{
            res.send(dbTitle);
          }
        });
    }
  });

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