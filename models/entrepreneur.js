var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var titleSchema = new Schema({
  title:{
    type: String
  },
  link:{
    type: String
  }
});

var Title = mongoose.model('title', titleSchema);
module.exports = Title;