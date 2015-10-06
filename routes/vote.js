var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dicon2015'
});

// router.param('user_id', function (req, res, next, u_id) {
//   if(!isFinite(+u_id)){
//     return next(new Error('user_id invalid'));
//   }
//   pool.getConnection(function(err, connection) {
//     connection.query('SELECT * FROM users WHERE u_id=?', +u_id, function(err, rows) {
//       if(err) console.log(err);
//       connection.release();

//       if(rows.length === 0){
//         return next(new Error('user not found'));
//       }
//       req.user = rows[0]
//       next()
//     });
//   });
// });

router.get('/create', function (req, res, next) {
  var user = req.session.user;
  res.render('createvote', {title: 'create', user: user});
});

router.post('/create', function (req, res, next) {
  var user = req.session.user;
  pool.getConnection(function (err, connection) {
    var data = req.body;
    finish_time = data.finish_date+" "+data.finish_at;
    connection.query('INSERT INTO vote_list( u_id, question, answer, ath, secret, create_time, finish_time) VALUES (?,?,?,?,?, NOW(),?)', [user.u_id, data.question, data.answer, data.ath, data.secret, finish_time], function (err, rows) {
      if(err) console.log(err);
      connection.release();
      res.redirect('/user/'+user.u_id);
    });
    // if(data.create_date === data.finish_date && data.create_at < data.finish_at){
    //   connection.query('INSERT INTO vote_list( u_id, question, answer, ath, secret, create_time, finish_time) VALUES (?,?,?,?,?, NOW(),?)', [user.u_id, data.question, data.answer, data.ath, data.secret, finish_time], function (err, rows) {
    //     if(err) console.log(err);
    //     connection.release();
    //     res.redirect('/user/'+user.u_id);
    //   });
    // }
    // else
    //   return next(new Error('Time invalid'));
  });
});

router.param('vote_id', function (req, res, next, id) {
  if(!isFinite(+id)){
    return next(new Error('vote_id invalid'));
  }
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM vote_list WHERE id=?', +id, function(err, rows) {
      if(err) console.log(err);
      connection.release();

      if(rows.length === 0){
        return next(new Error('vote not found'));
      }
      req.vote = rows[0]
      next()
    });
  });
});

// router.get('/', function (req, res, next) {
//   var user = req.session.user;
//   res.render('vote', {title: 'vote', user: user});
// });

router.get('/:vote_id', function (req, res, next) {
  var user = req.session.user;
  res.render('vote', {title: req.vote.question, vote: req.vote, user: user});
});

module.exports = router;