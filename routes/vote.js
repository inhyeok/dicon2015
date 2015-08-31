var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('vote', {title: 'vote'});
});

router.get('/create', function (req, res, next) {
  res.render('createvote', {title: 'create'});
});

module.exports = router;