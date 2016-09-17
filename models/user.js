var mongoose = require('mongoose');
Schema = mongoose.Schema;

var userSchema = new Schema({
  nama: String,
  nip: Number,
  password: String,
  level: Number
});

module.exports = mongoose.model('users', userSchema);
