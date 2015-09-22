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
  res.render('vote', {title: 'vote'});
});

router.get('/create', function (req, res, next) {
  res.render('createvote', {title: 'create'});
});

router.post('/create', function (req, res, next) {
  pool.getConnection(function (err, connection) {
    var data = req.body;
    var u_id = req.session.user.u_id;
    connection.query('INSERT INTO voteList( u_id, question, answer, ath, secret, createDate, createAt, finishDate, finishAt) VALUES (?,?,?,?,?,?,?,?,?)', u_id,data.question, data.answer, data.ath, data.secret, data.createDate, data.createAt, data.finishDate, data.finishAt, function (err, rows) {
      if(err) console.log(err);
      connection.release();

      res.redirect('/user/'+u_id);
    });
  });
});

module.exports = router;