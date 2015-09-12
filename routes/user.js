var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dicon2015'
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

router.get('/', function (req, res, next) {
  res.redirect('/user/'+user_id);
});

router.get('/:user_id', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    connection.query('SELECT * FROM voteList WHERE u_id=?', req.user.u_id, function (err, rows) {
      if(err) console.log(err);
      connection.release();
      res.render('user', {title: 'user', user: req.user, voteList: rows});
    });
  });
});

router.post('/:user_id', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    connection.query('UPDATE users SET u_name=?, u_email=?, u_ph=?, u_self=? WHERE u_id=? ', req.user.u_id, function (err, rows) {
      if(err) console.log(err);
      connection.release();
      res.render('user', {title: 'user', user: req.user, voteList: rows});
    });
  });
});

module.exports = router;