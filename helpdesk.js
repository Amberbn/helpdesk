var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require('http');
var session = require('express-session');

//models controllers
var User = require('./models/user');
var Kategori = require('./models/kategori');
var Lab = require('./models/lab');
var Problem = require('./models/problem');
var Id = require('./models/id');

var CMenu = require('./controllers/CMenu');
var CProblem = require('./controllers/CProblem');
var CLogin = require('./controllers/CLogin');
var CUser = require('./controllers/CUser');

//Membuat koneksi ke database
mongoose.connect('mongodb://127.0.0.1/helpdeskdb',function(err){
	if (err) {
		console.log('gagal koneksi database');
	}else{
		console.log('Sukses koneksi database');
	}
});

var helpdesk = express();

//set PORT 3000
helpdesk.set('port',process.env.PORT || 3000);

// view engine setup
helpdesk.set('views', path.join(__dirname, 'views'));
helpdesk.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
helpdesk.use(logger('dev'));
helpdesk.use(bodyParser.json());
helpdesk.use(bodyParser.urlencoded({ extended: false }));
helpdesk.use(cookieParser());
helpdesk.use(express.static(path.join(__dirname, 'public')));

//menggunakan session
helpdesk.use(session({
  secret: 'BennyAmber',
  resave: false,
  saveUninitialized: true
  //cookie: { secure: true }
}));

// Session-persisted message midleware
helpdesk.use(function(req, res, next){
  var err = req.session.error;
  var msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = '';
  // if (err) res.locals.message = '<p class="msg error">' + err + '</p>';
  // if (msg) res.locals.message = '<p class="msg success">' + msg + '</p>';
	if (err) res.locals.message =  err;
  if (msg) res.locals.message = msg;
  next();
});

//index
helpdesk.get('/',CMenu.index);
helpdesk.get('/login',CMenu.login);
helpdesk.get('/about', CMenu.about);

//Penjaga Lab
helpdesk.get('/Pbuatkeluahan',CProblem.Pbuatkeluhan);
//helpdesk.get('/Plihatkeluhan',CTickets.Plihatkeluhan);
helpdesk.post('/Psimpankeluhan',CProblem.Pticket_save);
helpdesk.get('/Tinputperbaikan/_id=:_id',CProblem.Tinputperbaikan);

//Kepala Lab
helpdesk.get('/lihatkeluhan', CProblem.lihatkeluhan);
helpdesk.get('/lihathasilperbaikan',CProblem.lihathasilperbaikan);
helpdesk.get('/approveticket/_id=:_id', CProblem.approveproblem);

helpdesk.post('/approveticket', CProblem.save_approveproblem);
helpdesk.get('/Klaporan',CProblem.laporan);
helpdesk.post('/Klaporan', CProblem.laporan);

//User
helpdesk.get('/index',CUser.index);
helpdesk.get('/Kinputuser',CUser.Kinputuser);
helpdesk.post('/Ksimpanuser',CUser.Ksimpanuser);
helpdesk.get('/hapusUser/_id=:_id', CUser.hapusUser)

helpdesk.post('/Tsaveperbaikan',CProblem.Tsaveperbaikan);
helpdesk.get('/Kedituser/_id=:_id', CUser.edituser);
helpdesk.post('/edit_saveuser',CUser.edit_saveuser);
helpdesk.param('_id', function(req, res, next, _id) {
  // try to get the user details from the User model and attach it to the request object
  User.find({_id : _id}, function(err, data) {
    if (err) { throw err
    } else {
			req.doT = data[0];
      next();
    }
  });
});

helpdesk.param('_id', function(req, res, next, _id) {
  // try to get the user details from the User model and attach it to the request object
  Problem.find({_id : _id}, function(err, data) {
    if (err) { throw err
    } else {
			req.doc = data[0];
      next();
    }
  });
});

//Login
helpdesk.post('/login', CLogin.user_verifikasi);
helpdesk.get('/logout', CLogin.logout);


// catch 404 and forward to error handler
helpdesk.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (helpdesk.get('env') === 'development') {
  helpdesk.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
helpdesk.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//memanggil port
http.createServer(helpdesk).listen(helpdesk.get('port'), function(){
	console.log('Aplikasi jalan di server:' +helpdesk.get('port'));
});
