var express = require('express')
  , http = require('http')
  , app = express()
  , server = http.createServer(app)
  , path = require("path")
  , serveStatic = require('serve-static');

//app.use(serveStatic('static'))
app.use('/static', serveStatic('static'));
app.use('/bower_components', serveStatic('bower_components'));

app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  res.render('index', {title: 'dicon'});
});
app.get('/sign', function (req, res) {
  res.render('sign', {title: 'dicon'});
});
app.get('/main', function (req, res) {
  res.render('main', {title: 'dicon'});
});
app.get('/all', function (req, res) {
  res.render('all', {title: 'dicon'});
});
app.get('/new', function (req, res) {
  res.render('new', {title: 'dicon'});
});
app.get('/time', function (req, res) {
  res.render('time', {title: 'dicon'});
});
app.get('/vote', function (req, res) {
  res.render('vote', {title: 'dicon'});
});
app.get('/createVote', function (req, res) {
  res.render('createVote', {title: 'dicon'});
});

server.listen(3232, function() {
  console.log('Express server listening on port ' + server.address().port);
});