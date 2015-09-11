var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'dicon2015'
});

router.param('user_id', function (req, res, next, id) {
  if(!isFinite(+id)){
    return next(new Error('user_id invalid'));
  }
  pool.getConnection(function(err, connection) {
    connection.query('SELECT * FROM users WHERE id=?', +id, function(err, rows) {
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
  console.log(req);
  res.render('user', {title: 'user', user: req.user});
});

module.exports = router;