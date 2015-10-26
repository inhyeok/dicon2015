var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dicon2015'
});

router.get('/create', function (req, res, next) {
  var user = req.session.user || '';
  if(!user){
    return next(res.render('error', {title: 'Error', message: '로그인이 필요한 페이지 입니다.'}));
  }
  res.render('vote_create', {title: 'create', user: user});
});

router.post('/create', function (req, res, next) {
  var user = req.session.user;
  pool.getConnection(function (err, connection) {
    var data = req.body;
    answer = [];
    for(var i in data.answer){
      var answer_oj = {
        label: data.answer[i],
        count: 0
      };
      answer.push(answer_oj);
    }
    answer = JSON.stringify(answer);
    finish_time = data.finish_date+" "+data.finish_at;
    connection.query('INSERT INTO questions( u_id, question, answer, ath, secret, create_time, finish_time, count) VALUES (?,?,?,?,?, NOW(),?, 0)', [user.u_id, data.question, answer, data.ath, data.secret, finish_time], function (err, result) {
      if(err) return next(res.render('error', {title: 'Error', message: err}));
      connection.release();
      res.redirect('/user/'+user.u_id);
    });
  });
});

router.param('question_id', function (req, res, next, id) {
  if(!isFinite(+id)){
    return next(res.render('error', {title: 'Error', message: 'vote_id invalid'}));
  }
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM questions WHERE id=?', +id, function(err, rows) {
      if(err) return next(res.render('error', {title: 'Error', message: err}));

      // if(rows.length === 0){
      //   return next(res.render('error', {title: 'Error', message: 'vote not found'}));
      // }
      connection.release();
      req.vote = rows[0];
      next();
    });
  });
});

router.get('/:question_id', function (req, res, next) {
  var user = req.session.user || '';
  if(!req.vote){
    return next(res.render('error', {title: 'Error', message: 'vote not found'}));
  }
  pool.getConnection(function(err, connection) {
    connection.query('UPDATE questions SET count = count+1 WHERE id = ?', [req.vote.id], function (err, result) {
      if(err) return next(res.render('error', {title: 'Error', message: err}));
      connection.release();
      req.vote.answer = JSON.parse(req.vote.answer);
      res.render('vote', {title: req.vote.question, vote: req.vote, user: user});
    });
  });
});

router.post('/:question_id', function (req, res, next) {
  var user = req.session.user || '';
  var now_time = moment().format('YYYY-MM-DD HH:mm:ss');
  var finish_time = moment(req.vote.finish_time).format('YYYY-MM-DD HH:mm:ss');
  if(!user){
    return next(res.redirect('/user/no'));
  }
  if(now_time < finish_time){
    pool.getConnection(function (err, connection) {
      req.vote.question = "[마감]"+req.vote.question;
      connection.query('UPDATE questions SET question = ?, finish_vote = "Y" WHERE id = ?', [ req.vote.question, req.vote.id], function (err, result) {
        if(err) return err;
        connection.release();
        return false, next(res.render('error', {title: 'FINISH VOTE', message: '마감된 투표입니다.'}));
      });
    });
  }
  else{
    pool.getConnection(function(err, connection) {
      var data = req.body;
      req.vote.answer = JSON.parse(req.vote.answer);
      if(!data.answer || typeof data.answer !== 'string'){
        return false;
      }
      var user_join_data = []
      if(req.vote.user_join){
        for(var i in req.vote.user_join.split('\n')){
          if(+req.vote.user_join.split('\n')[i] === +user.u_id){
            return false, next(res.render('error', {title: 'Error', message: '이미 투표를 하신 유저입니다.'}));
          }
        }
        user_join_data = [req.vote.user_join];
      }
      user_join_data.push(user.u_id);
      user_join_data = user_join_data.join('\n');
      for(var i in req.vote.answer){
        if(req.vote.answer[i].label === data.answer){
          req.vote.answer[i].count += 1;
        }
      }
      else if(+i === +req.vote.answer.length-1){
        var answer_oj = {
          label: data.answer,
          count: 1
        };
        req.vote.answer.push(answer_oj);
      }
    }
    req.vote.answer = JSON.stringify(req.vote.answer);
    connection.query('UPDATE questions SET answer = ?, user_join = ? WHERE id = ?', [ req.vote.answer, user_join_data, req.vote.id], function (err, result) {
      if(err) return err;
      connection.release();
      res.redirect('/vote/'+req.vote.id);
    });
  }
});

router.get('/update/:question_id', function (req, res, next) {
  var user = req.session.user || '';
  if(user.u_id !== req.vote.u_id)
    return next(res.render('error', {title: 'Error', message: '권한이 없는 페이지 입니다.'}));
  req.vote.answer = JSON.parse(req.vote.answer);
  res.render('vote_update', {title: 'vote', vote: req.vote, user: user});
});

router.post('/update/:question_id', function (req, res, next) {
  var user = req.session.user;
  pool.getConnection(function (err, connection) {
    var data = req.body;
    answer = [];
    for(var i in data.answer){
      var answer_oj = {
        label: data.answer[i],
        count: 0
      };
      answer.push(answer_oj);
    }
    answer = JSON.stringify(answer);
    finish_time = data.finish_date+" "+data.finish_at;
    connection.query('UPDATE questions SET question = ?, answer = ?, ath = ?, secret = ?, finish_time = ? WHERE id = ?', [data.question, answer, data.ath, data.secret, finish_time, req.vote.id], function (err, rows) {
      if(err) return next(res.render('error', {title: 'Error', message: err}));
      connection.release();
      res.redirect('/vote/'+req.vote.id);
    });
  });
});

router.get('/delete/:question_id', function (req, res, next) {
  var user = req.session.user || '';
  pool.getConnection(function(err, connection) {
    connection.query('DELETE FROM questions WHERE id = ?', [req.vote.id], function (err) {
      if(err) return next(res.render('error', {title: 'Error', message: err}));
      connection.release();
      res.redirect('/user/'+user.u_id);
    });
  });
});

module.exports = router;