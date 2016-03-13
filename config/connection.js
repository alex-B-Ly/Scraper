var mongoose = require('mongoose');

// TODO Add DB name at end of connect line below
mongoose.connect('mongodb://localhost/');
var db = mongoose.connection;

module.exports = db;