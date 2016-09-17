var mongoose = require('mongoose');
Schema = mongoose.Schema;

var idSchema = new Schema({
  idproblem: Number
});

module.exports = mongoose.model('ids', idSchema);
