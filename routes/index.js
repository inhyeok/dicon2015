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


router.get('/', function (req, res, next) {
  res.render('index', {title: 'dicon'});
});

router.post('/login', function (req, res, next) {
  var l_email = req.body.l_email;
  var l_pw = req.body.l_pw || '';
  var md5 = crypto.createHash('md5'); //hash md5 생성
  l_pw = md5.update(l_pw).digest('hex'); //md5 값 변환
  pool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM users WHERE u_email=?', [l_email], function (err, rows) {
      if(err){
        console.log('Input ID is Wrong....');
        return res.redirect('/');
      }
      if(rows.length === 0){
        // not signed
        console.log('No user found');
        return res.redirect('/');
      }
      user = rows[0]
      if(l_pw !== user.u_pw){
        console.log('Input PW is Wrong....');
        res.redirect('/');
      }
      else{
        req.session.user = user;
        console.log(req.session.user);
        console.log('Login Success!!!!');
        res.redirect('/main');
      }
    });
  });
});

router.post('/sign', function (req, res, next) {
  var u_name = req.body.u_name;
  var u_email = req.body.u_email;
  var u_pw = req.body.u_pw || '';
  var u_ph = req.body.u_ph;
  var md5 = crypto.createHash('md5'); //hash md5 생성
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
  var user = req.session.user;
  pool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM vote_list ORDER BY id DESC LIMIT 10', function (err, rows) {
      if(err) console.log(err);
      connection.release();
      res.render('main', {title: 'dicon', user: user, vote_list: rows});
    });
  });
});

router.get('/all', function (req, res, next) {
  var user = req.session.user;
  pool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM vote_list ORDER BY id DESC', function (err, rows) {
      if(err) console.log(err);
      connection.release();
      res.render('all', {title: 'dicon', user: user, vote_list: rows});
    });
  });
});

router.get('/new', function (req, res, next) {
  var user = req.session.user;
  pool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM vote_list WHERE date(create_time) >= date(subdate(now(), INTERVAL 7 DAY)) and date(finish_time) <= date(now()) ORDER BY id DESC', function (err, rows) {
      if(err) console.log(err);
      connection.release();
      res.render('new', {title: 'dicon', user: user, vote_list: rows});
    });
  });
});

router.get('/time', function (req, res, next) {
  var user = req.session.user;
  pool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM vote_list WHERE date(finish_time) >= date(subdate(now(), INTERVAL 3 DAY)) and date(finish_time) <= date(now()) ORDER BY id DESC', function (err, rows) {
      console.log(rows);
      if(err) console.log(err);
      connection.release();
      res.render('time', {title: 'dicon', user: user, vote_list: rows});
    });
  });
});

module.exports = router;