var mongoose = require('mongoose');
Schema = mongoose.Schema;

var kategoriSchema = new Schema({
  idkategori: String,
  namakategori: String
});

module.exports = mongoose.model('kategoris', kategoriSchema);
