var express = require('express');
var router = express.Router();
var crypto = require('crypto'); //hash 생성 모듈
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dicon2015'
});

var md5 = crypto.createHash('md5'); //hash md5 생성

router.get('/', function (req, res, next) {
  res.render('index', {title: 'dicon'});
});

router.post('/login', function (req, res, next) {
  var l_email = req.body.l_email;
  var l_pw = req.body.l_pw;
  l_pw = md5.update(l_pw).digest('hex'); //md5 값 변환
  pool.getConnection(function (err, connection) {
    connection.query('SELECT u_pw FROM users WHERE u_email=?', l_email,function (err, rows) {
      if(err){
        console.log('Input ID is Wrong....');
        res.redirect('/');
      }
      if(l_pw !== rows.l_pw){
        console.log('Input PW is Wrong....');
        res.redirect('/');
      }
      else{
        console.log('Login Success!!!!');
        res.redirect('/main');
      }
    });
  });
});

router.post('/sign', function (req, res, next) {
  var u_name = req.body.u_name;
  var u_email = req.body.u_email;
  var u_pw = req.body.u_pw;
  var u_ph = req.body.u_ph;
  u_pw = md5.update(u_pw).digest('hex'); //md5 값 변환
  var user = [u_name, u_email, u_pw, u_ph];
  pool.getConnection(function (err, connection) {
    connection.query('INSERT INTO users(u_name, u_email, u_pw, u_ph) VALUES (?,?,?,?)', user, function (err, rows) {
      if(err) console.log(err);
      connection.release();
      res.redirect('/');
    });
  });
});

router.get('/main', function (req, res, next) {
  res.render('main', {title: 'dicon'});
});

router.get('/all', function (req, res, next) {
  res.render('all', {title: 'dicon'});
});

router.get('/new', function (req, res, next) {
  res.render('new', {title: 'dicon'});
});

router.get('/time', function (req, res, next) {
  res.render('time', {title: 'dicon'});
});

module.exports = router;