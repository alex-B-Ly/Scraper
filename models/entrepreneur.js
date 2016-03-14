var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var titleSchema = new Schema({
  title:{
    type: String
  },
  link:{
    type: String
  },
  comments:[{
    type: Schema.Types.ObjectId,
    ref: 'Comments'
  }]
});

var Title = mongoose.model('title', titleSchema);
module.exports = Title;