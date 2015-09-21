var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('ex', {title: 'ex'});
});

router.get('/2', function (req, res, next) {
  res.render('ex2', {title: 'ex2'});
});

module.exports = router;