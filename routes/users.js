var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/new', function(req, res, next) {
  res.status(501).end();
});
router.post('/login', function(req, res, next) {
  res.status(501).end();
});

module.exports = router;
