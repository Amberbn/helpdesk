var User = require('../models/user');

exports.user_verifikasi = function(req, res){
  User.findOne({nip : req.body.nip}, function(err, doc){
    if (doc) {
      if (doc.level==1) {
        if (req.body.password==doc.password) {
          req.session.regenerate(function(){
            req.session.kepala = doc;
            req.session.success= 'session success' + doc.name;
            res.redirect('/index');
          })
        }else {
          req.session.error = 'Password salah';
          res.redirect('/');
        }
      }else if (doc.level==2) {
        if (req.body.password==doc.password) {
          req.session.regenerate(function(){
            req.session.petugas = doc;
            req.session.success = 'session success' + doc.name;
            res.redirect('/index');
          })
        } else {
          req.session.error = 'Password salah';
          res.redirect('/');
        }
      }else {
        if (req.body.password==doc.password) {
          req.session.regenerate(function(){
            req.session.teknisi = doc;
            req.session.success = 'session success' + doc.name;
            res.redirect('/index');
          })
        } else {
          req.session.error = 'Password salah';
          res.redirect('/');
        }
      }
    }else {
      req.session.error = 'User salah tidak ada di database';
      res.redirect('/');
    }
  })
}

//logout
exports.logout = function(req, res) {
  req.session.destroy(function(err){
    if (err) {
      console.log(err);
    }else {
      res.redirect('/');
    }
  });
}
