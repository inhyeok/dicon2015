var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', {title: 'dicon'});
});

router.get('/login',function (req, res, next) {
  res.redirect('/main');
});

router.get('/sign', function (req, res, next) {
  res.render('sign', {title: 'dicon'});
});

router.get('/main', function (req, res, next) {
  res.render('main', {title: 'dicon'});
});

router.get('/all', function (req, res, next) {
  res.render('all', {title: 'dicon'});
});

router.get('/new', function (req, res, next) {
  res.render('new', {title: 'dicon'});
});

router.get('/time', function (req, res, next) {
  res.render('time', {title: 'dicon'});
});

module.exports = router;