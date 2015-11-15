var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'research0302',
  database: 'dicon2015'
});

router.get('/no', function (req, res, next) {
  var user = req.session.user || '';
  res.render('user_no', {title: 'user', user: user});
});

router.param('user_id', function (req, res, next, u_id) {
  if(!isFinite(+u_id)){
    return next(res.render('error', {title: 'Error', message: 'user_id invalid'}));
  }
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM users WHERE u_id=?', +u_id, function(err, rows) {
      if(err) return next(res.render('error', {title: 'Error', message: err}));
      connection.release();
      req.user = rows[0];
      next();
    });
  });
});

router.get('/:user_id', function (req, res, next) {
  var user = req.session.user || '';
  if(!req.user){
    return next(res.render('error', {title: 'Error', message: '유저를 찾을 수 없습니다.'}));
  }
  pool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM questions WHERE u_id=? ORDER BY id DESC', req.user.u_id, function (err, rows) {
      if(err) return next(res.render('error', {title: 'Error', message: err}));
      var vote_list = rows;
      connection.release();
      res.render('user', {title: 'user', v_user: req.user, vote_list: vote_list, user: user});
    });
  });
});

router.get('/delete/:user_id', function (req, res, next) {
  var user = req.session.user || '';
  if(!req.user){
    return next(res.render('error', {title: 'Error', message: '유저를 찾을 수 없습니다.'}));
  }
  pool.getConnection(function (err, connection) {
    connection.query('DELETE FROM users WHERE u_id = ?', req.user.u_id, function (err) {
      if(err) return next(res.render('error', {title: 'Error', message: err}));
      connection.release();
      delete req.session.user;
      res.redirect('/');
    });
  });
});

router.get('/update/:user_id', function (req, res, next) {
  var user = req.session.user || '';
  if(user.u_id !== req.user.u_id)
    return next(res.render('error', {title: 'Error', message: '권한이 없는 페이지 입니다.'}));
  res.render('user_update', {title: 'user', v_user: req.user, user: user});
});


router.post('/update/:user_id', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    var data = req.body;
    connection.query('UPDATE users SET u_name=?, u_email=?, u_ph=?, u_self=?, u_email_secret = ?, u_ph_secret = ? WHERE u_id=?', [data.u_name, data.u_email, data.u_ph, data.u_self, data.u_email_secret, data.u_ph_secret, req.user.u_id], function (err, rows) {
      if(err) return next(res.render('error', {title: 'Error', message: err}));
      connection.release();
      req.session.user = req.user; //session update
      res.redirect('/user/'+req.user.u_id);
    });
  });
});

router.get('/:user_id/logout', function (req, res, next) {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;