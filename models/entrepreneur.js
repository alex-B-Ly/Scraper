var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var titleSchema = new Schema({
  title:{
    type: String
  },
  link:{
    type: String
  },
  dateCreated:{
    type: Date,
    default: Date.now
  },
  dateUpdated:{
    type: Date,
    default: Date.now
  },
  comments:[{
    type: Array,
    ref: 'comment'
  }]
});

var Title = mongoose.model('title', titleSchema);
module.exports = Title;