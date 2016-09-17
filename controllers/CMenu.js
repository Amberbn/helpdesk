//controllers index
exports.index = function(req, res) {
  res.render('index',{title:'Helpdesk'});
}

//controllers login
exports.login = function(req, res){
  res.render('login');
}

//controllers about
exports.about = function(req, res){
  res.render('about');
}
