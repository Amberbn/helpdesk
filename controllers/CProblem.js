//controllers models
var Kategori = require('../models/kategori');
var Lab = require('../models/lab');
var Problem = require('../models/problem');
var User = require('../models/user');
var Id = require('../models/id');

//controllers buatkeluahan penjagalab
exports.Pbuatkeluhan = function(req, res){
   if (req.session.petugas) {
    Kategori.find(function(err, datakategori){
      if(err)throw err;
      Lab.find(function(e, datalab){
        if(e) throw e;
        Id.count(function(e, notic){
          var no = notic +1;
          if(e) throw e;
            else res.render('./penjagalab/Pbuatkeluhan',{lab:datalab,kategori:datakategori,nama:req.session.petugas.nama,noticket:no});
        })
      });
    })
  }else res.redirect('/');
}

//controllers save keluhan/ticket penjaga lab
exports.Pticket_save = function(req, res){
  if (req.session.petugas) {
    new Problem({
      noticket : req.body.noticket,
      customer : req.body.customer,
      namalab : req.body.namalab,
      kategori : req.body.kategori,
      namaproduk : req.body.namaproduk,
      date : req.body.date,
      ticket : req.body.ticket,
      status : 'Menunggu'
    }).save(function(err){
      if (err) throw err;
        new Id({
          idproblem : req.body.noticket
        }).save(function(e){
          if (e) throw e;
          res.redirect('/Pbuatkeluahan');
        })
    })
  }else res.redirect('/');
}

exports.Pid_save = function(){
  i
  new Id({
    idproblem : req.body.idproblem
  })
}
/* and penjagalab */

/*Teknisi*/
exports.Tinputperbaikan = function(req, res){
  if(req.session.teknisi){
          res.render('./teknisi/Tinputperbaikan', {pticket: req.doc});
        } else {
     res.redirect('/')
   }
 }

exports.Tsaveperbaikan = function(req, res){
  if(req.session.teknisi){
    Problem.update({_id : req.body._id},{
      $set : {
        dateperbaikan : req.body.dateperbaikan,
        catatan       : req.body.catatan,
        status        : req.body.status,
        rekomendasi   : req.body.rekomendasi,
        teknisi : req.session.teknisi.nama
      }}, function(e){
        if (e) throw e;
        req.session.success = 'Sukses ... !!';
        res.redirect('/lihatkeluhan');
      })
  }else res.render('/');
}
/*End Teknisi*/

/*Kepalalab*/
exports.approveproblem = function(req, res){
  if (req.session.kepala) {
      User.find({level : 3}, function(e, ul3){
        res.render('./kepalalab/approve', {dttk : ul3, nama : req.session.kepala.nama, tck : req.doc});
      })
  } else {
    res.redirect('/')
  }
};

exports.save_approveproblem = function(req, res){
  if (req.session.kepala) {
        Problem.update({_id : req.body._id},{$set : {
          status : 'Belum',
          nip    : req.body.nip,
        //  teknisi       : data
        }}, function(e){
          if (e) throw e;
          req.session.success = 'Approve ticket sukses';
          res.redirect('/lihatkeluhan');
        })
  }
}

exports.laporan = function(req, res){
  if (req.session.kepala) {
    if (req.body.submit) {
        Problem.find({date : {$gte : req.body.date1, $lte : req.body.date2}},function(e, dts){
          res.render('./kepalalab/Khasillaporan', {lap : dts});
        });

    } else {
      Problem.find({},function(e, dtsd){
        if (e) throw e;
        res.render('./kepalalab/Klaporan',{lap:dtsd});
  })
}
}else res.redirect('/');
}

/*End Kepalalab*/

//Fungsi Lihat ticket untuk semua user
exports.lihatkeluhan = function(req, res){
  if (req.session.kepala) {
    Problem.find({status : 'Menunggu'},function(err, ticketdata){
      if (err) throw err;
      res.render('./kepalalab/Klihatkeluhan', {ticket:ticketdata});
    })
  } else   if (req.session.petugas) {
      Problem.find(function(err, dataticket){
        if (err) throw err;
          else res.render('./penjagalab/Plihatkeluhan',{ticket : dataticket});
      })
    }  else if (req.session.teknisi) {
        Problem.find({nip : req.session.teknisi.nip},function(err, docTicket){
          if(err) throw err;
          else res.render('./teknisi/Tlihatkeluhan', {ticket:docTicket})
        })
      }
   else res.redirect('/');
}

//controller lihatperbaikan semua user
exports.lihathasilperbaikan = function(req, res){
  if (req.session.kepala) {
    Problem.find(function(err, ticketdata){
      if (err) throw err;
      res.render('./kepalalab/Klihathasilperbaikan', {perbaikan_ticket:ticketdata});
    })
  }else res.redirect('/');
}
