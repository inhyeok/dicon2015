var express = require('express')
  , logger = require('morgan')
  , http = require('http')
  , app = express()
  , server = http.createServer(app)
  , path = require("path")
  , serveStatic = require('serve-static')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , moment = require('moment')
  , session = require('client-sessions')
  , port = process.env.PORT || 8080;

var routes = require('./routes/index');
var vote = require('./routes/vote');
var user = require('./routes/user');
var ex = require('./routes/ex');

app.locals.moment = require('moment');
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
app.use(session({
  cookieName: 'session',
  requestKey: 'session',
  secret: 'holgabun',
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5,
  httpOnly: true,
  secure: false,
  ephemeral: true
}));

app.use('/', routes);
app.use('/vote', vote);
app.use('/user', user);
app.use('/ex', ex);


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
server.listen(port, function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;