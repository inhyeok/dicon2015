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
  var user = req.session.user || '';
  if(!user)
    res.render('error', {title: 'Error', message: '로그인이 필요한 페이지 입니다.'});
  res.render('vote_create', {title: 'create', user: user});
});

router.post('/create', function (req, res, next) {
  var user = req.session.user;
  pool.getConnection(function (err, connection) {
    var data = req.body;
    // console.log(data.answer);
    data.answer = data.answer.join('\n');
    // console.log(data.answer);
    finish_time = data.finish_date+" "+data.finish_at;
    connection.query('INSERT INTO questions( u_id, question, answer, ath, secret, create_time, finish_time, count) VALUES (?,?,?,?,?, NOW(),?, 0)', [user.u_id, data.question, data.answer, data.ath, data.secret, finish_time], function (err, result) {
      if(err) res.render('error', {title: 'Error', message: err});
      connection.query('INSERT INTO answers(question_id) VALUES (?)', result.insertId, function (err) {
        if(err) res.render('error', {title: 'Error', message: err});
        connection.release();
        res.redirect('/user/'+user.u_id);
      });
    });
  });
});

// router.post('/create', function (req, res, next) {
//   var user = req.session.user;
//   pool.getConnection(function (err, connection) {
//     var data = req.body;
//     // console.log(data.answer);
//     data.answer = data.answer.join('\n');
//     // console.log(data.answer);
//     finish_time = data.finish_date+" "+data.finish_at;
//     connection.query('INSERT INTO vote_list( u_id, question, answer, ath, secret, create_time, finish_time, count) VALUES (?,?,?,?,?, NOW(),?, 0)', [user.u_id, data.question, data.answer, data.ath, data.secret, finish_time], function (err, rows) {
//       if(err) console.log(err);
//       connection.release();
//       res.redirect('/user/'+user.u_id);
//     });
//     // if(data.create_date === data.finish_date && data.create_at < data.finish_at){
//     //   connection.query('INSERT INTO vote_list( u_id, question, answer, ath, secret, create_time, finish_time) VALUES (?,?,?,?,?, NOW(),?)', [user.u_id, data.question, data.answer, data.ath, data.secret, finish_time], function (err, rows) {
//     //     if(err) console.log(err);
//     //     connection.release();
//     //     res.redirect('/user/'+user.u_id);
//     //   });
//     // }
//     // else
//     //   return next(new Error('Time invalid'));
//   });
// });

// router.param('vote_id', function (req, res, next, id) {
//   if(!isFinite(+id)){
//     return next(new Error('vote_id invalid'));
//   }
//   pool.getConnection(function(err, connection) {
//     connection.query('SELECT * FROM vote_list WHERE id=?', +id, function(err, rows) {
//       if(err) console.log(err);
//       connection.release();

//       if(rows.length === 0){
//         return next(new Error('vote not found'));
//       }
//       req.vote = rows[0]
//       next()
//     });
//   });
// });

router.param('question_id', function (req, res, next, id) {
  if(!isFinite(+id)){
    return next(new Error('vote_id invalid'));
  }
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM questions WHERE id=?', +id, function(err, rows) {
      if(err) return next(new Error(error));
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

router.get('/:question_id', function (req, res, next) {
  var user = req.session.user || '';
  pool.getConnection(function(err, connection) {
    connection.query('UPDATE questions SET count = count+1 WHERE id = ?', [req.vote.id], function (err, result) {
      if(err) console.log(err);
      connection.release();
      res.render('vote', {title: req.vote.question, vote: req.vote, user: user});
    });
  });
});

router.post('/:question_id', function (req, res, next) {
  var user = req.session.user || '';
  pool.getConnection(function(err, connection) {
    var data = req.body;
    // data.answer = data.answer.join(',');
    console.log(data.answer, user.u_id);
    connection.query('SELECT answer, join_user FROM answers WHERE question_id = ?', [req.vote.id], function (err, result) {
      if(err) return next(new Error(err));
      // for()
      console.log(result[0]);
      if(result[0].join_user === data.user){
        return next(new Error('이미 투표를 하신 유저 입니다.'));
      }
      var answer_data = [result[0].answer];
      var join_user_data = [result[0].join_user];

      answer_data.push(data.answer);
      join_user_data.push(user.u_id);


      answer_data = answer_data.join('\n');
      join_user_data = join_user_data.join('\n');

      // console.log(answer_data);
      // console.log(join_user_data);

      connection.query('UPDATE answers SET answer = ?, join_user = ? WHERE question_id = ?', [ answer_data, join_user_data, req.vote.id], function (err, result) {
        if(err) return err;
        connection.release();
        console.log(result);
        res.redirect('/vote/'+req.vote.id);
      });
    });
  });
});

router.get('/update/:question_id', function (req, res, next) {
  var user = req.session.user || '';
  if(user.u_id !== req.vote.u_id)
    res.render('error', {title: 'Error', message: '권한이 없는 페이지 입니다.'});
  res.render('vote_update', {title: 'vote', vote: req.vote, user: user});
});

router.post('/update/:question_id', function (req, res, next) {
  var user = req.session.user || '';
  pool.getConnection(function(err, connection) {
    var data = req.body;
    data.answer = data.answer.join('\n');
    var finish_time = data.finish_date+" "+data.finish_at;
    connection.query('UPDATE questions SET question = ?, answer = ?, ath = ?, secret = ?, finish_time = ? WHERE id = ?', [data.question, data.answer, data.ath, data.secret, finish_time, req.vote.id], function (err, rows) {
      if(err) console.log(err);
      connection.release();
      res.redirect('/vote/'+req.vote.id);
    });
  });
});

router.get('/delete/:question_id', function (req, res, next) {
  var user = req.session.user || '';
  pool.getConnection(function(err, connection) {
    connection.query('DELETE FROM questions WHERE id = ?', [req.vote.id], function (err) {
      if(err) console.log(err);
      connection.query('DELETE FROM answers WHERE question_id = ?', [req.vote.id], function (err) {
        connection.release();
        res.redirect('/user/'+user.u_id);
      });
    });
  });
});

module.exports = router;