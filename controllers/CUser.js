//controllers models
var Kategori = require('../models/kategori');
var Lab = require('../models/lab');
var Problem = require('../models/problem');
var User = require('../models/user');

//controllers index semua user
exports.index = function(req, res){
  if (req.session.kepala) {
    res.render('./kepalalab/Kindex',{nama : req.session.kepala.nama, title:'Kepala Lab'});
  }else if (req.session.teknisi) {
    res.render('./teknisi/Tindex',{nama : req.session.teknisi.nama, title:'Teknisi Lab'});
  } else if (req.session.petugas) {
    res.render('./penjagalab/Pindex',{nama : req.session.petugas.nama, title : 'Petugas Lab'})
  } else {
    res.redirect('/');
  }
}

exports.edituser = function(req, res){
    if(req.session.kepala){
      console.log(req.doT);
            res.render('./kepalalab/edit-user', {user : req.doT});
    } else res.redirect('/')
}

exports.edit_saveuser = function(req, res){
    if(req.session.kepala){ // Tambahkan if dengan session berbeda jika ada user yng memiliki hak untuk edit ticket
        User.update({_id : req.body._id},{
            $set : {
                nama: req.body.nama,
                nip: req.body.nip,
                password: req.body.password,
                level: req.body.level
            }
        }, function(e){
            req.session.success = 'Update Success..';
            res.redirect('/Kinputuser')
        })
    } else res.redirect('/');
};

//controller input user kepala lab
exports.Kinputuser = function(req, res) {
  if (req.session.kepala) {
    User.find(function(e, data){
      res.render('./kepalalab/Kinputuser',{user: data});
    });
  } else {
    res.redirect('/');
  }
}

//controller simpan input user kepalalab
exports.Ksimpanuser = function(req, res){
  if (req.session.kepala) {
    new User({
      nama : req.body.nama,
      nip : req.body.nip,
      password : req.body.password,
      level : req.body.level
    }).save(function(err){
          if (err) throw err;
          res.redirect('/Kinputuser');
        })
  }else res.redirect('/');
}

exports.hapusUser = function(req, res){
 if(req.session.kepala){
   User.remove({_id : req.params._id}, function(e){
     if(e) throw e;
     else {
       res.redirect('/Kinputuser');
     }
   })
 } else {
   res.redirect('/')
 }
}
