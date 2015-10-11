var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dicon2015'
});

router.get('/no', function (req, res, next) {
  var user = req.session.user || '';
  res.render('user_no', {title: 'user', user: user});
});

router.param('user_id', function (req, res, next, u_id) {
  if(!isFinite(+u_id)){
    return next(new Error('user_id invalid'));
  }
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM users WHERE u_id=?', +u_id, function(err, rows) {
      if(err) console.log(err);
      connection.release();

      if(rows.length === 0){
        return next(new Error('user not found'));
      }
      req.user = rows[0]
      next()
    });
  });
})

// router.get('/', function (req, res, next) {
//   console.log(req.session.user.u_id);
//   res.redirect('/user/'+req.session.user.u_id);
// });

router.get('/:user_id', function (req, res, next) {
  var user = req.session.user || '';
  // console.log(req.user);
  pool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM vote_list WHERE u_id=? ORDER BY id DESC', req.user.u_id, function (err, rows) {
      if(err) console.log(err);
      connection.release();
      res.render('user', {title: 'user', v_user: req.user, vote_list: rows, user: user});
    });
  });
});

router.get('/update/:user_id', function (req, res, next) {
  var user = req.session.user || '';
  if(user.u_id !== req.user.u_id)
    res.render('error', {title: 'Error', message: '권한이 없는 페이지 입니다.'});
    // return false;
  // console.log(req.user);
  res.render('user_update', {title: 'user', v_user: req.user, user: user});

});


router.post('/update/:user_id', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    var data = req.body;
    connection.query('UPDATE users SET u_name=?, u_email=?, u_ph=?, u_self=?, u_email_secret = ?, u_ph_secret = ? WHERE u_id=?', [data.u_name, data.u_email, data.u_ph, data.u_self, data.u_email_secret, data.u_ph_secret, req.user.u_id], function (err, rows) {
      if(err) console.log(err);
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