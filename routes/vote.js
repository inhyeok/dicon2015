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
  var user = req.session.user;
  res.render('vote', {title: 'vote', user: user});
});

router.get('/create', function (req, res, next) {
  var user = req.session.user;
  res.render('createvote', {title: 'create', user: user});
});

router.post('/create', function (req, res, next) {
  var user = req.session.user;
  pool.getConnection(function (err, connection) {
    var data = req.body;
    createTime = data.createDate+" "+data.createAt;
    finishTime = data.finishDate+" "+data.finishAt;
    connection.query('INSERT INTO vote_list( u_id, question, answer, ath, secret, createTime, finishTime) VALUES (?,?,?,?,?,?,?)', [user.u_id, data.question, data.answer, data.ath, data.secret, createTime, finishTime], function (err, rows) {
      if(err) console.log(err);
      connection.release();
      res.redirect('/user/'+user.u_id);
    });
  });
});

module.exports = router;