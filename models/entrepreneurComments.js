var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  comment:{
    type: String
  }
});

var Comments = mongoose.model('comment', commentSchema);
module.exports = Comments;