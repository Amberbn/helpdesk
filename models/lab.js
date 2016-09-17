var mongoose = require('mongoose');
Schema = mongoose.Schema;

var labSchema = new Schema({
  idlab: String,
  namalab: String
});

module.exports = mongoose.model('labs', labSchema);
