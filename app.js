var express = require('express')
  , logger = require('morgan')
  , http = require('http')
  , app = express()
  , server = http.createServer(app)
  , path = require("path")
  , serveStatic = require('serve-static')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override');

var routes = require('./routes/index');
var vote = require('./routes/vote');
var user = require('./routes/user');

app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'jade');

//app.use(serveStatic('static'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(methodOverride('_method'));

app.use('/', routes);
app.use('/vote', vote);
app.use('/user', user);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err.message);
    // res.render('error', {
    //   message: err.message,
    //   error: err
    // });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
  // res.render('error', {
  //   message: err.message,
  //   error: {}
  // });
});

server.listen(3232, function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;