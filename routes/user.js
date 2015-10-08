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

// router.get('/', function (req, res, next) {
//   console.log(req.session.user.u_id);
//   res.redirect('/user/'+req.session.user.u_id);
// });

router.get('/:user_id', function (req, res, next) {
  var user = req.session.user;
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
  var user = req.session.user;
  // console.log(req.user);
  res.render('user_update', {title: 'user', v_user: req.user, user: user});

});

router.post('/update/:user_id', function (req, res, next) {
  var user = req.session.user;
  pool.getConnection(function (err, connection) {
    user_form = req.body;
    connection.query('UPDATE users SET u_name=?, u_email=?, u_ph=?, u_self=? WHERE u_id=?', [user_form.u_name, user_form.u_email, user_form.u_ph, user_form.u_self, req.user.u_id], function (err, rows) {
      if(err) console.log(err);
      connection.release();
      req.session.user = req.user; //session update
      res.redirect('/user/'+user.u_id);
    });
  });
});

router.get('/:user_id/logout', function (req, res, next) {
  delete req.session.user;
  res.redirect('/');
});

module.exports = router;