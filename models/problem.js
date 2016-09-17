var mongoose = require('mongoose');
Schema = mongoose.Schema;

var problemSchema = new Schema({
  noticket: String,
  customer: String,
  namalab: String,
  kategori: String,
  namaproduk: String,
  date: String,
  ticket: String,
  status: String,
  statusSelesai: String,
  dateperbaikan: String,
  catatan: String,
  rekomendasi: String,
  nip : Number,
  teknisi : String
});

module.exports = mongoose.model('problems', problemSchema);
