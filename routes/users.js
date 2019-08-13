var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', function(req, res, next) {
  res.status(501).end();
});

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: "",
    error : "",
    success : "",
  });
});

router.post('/login', function(req, res, next) {
  res.status(501).end();
});

module.exports = router;
