var express = require('express');
var router = express.Router();
var spawn = require('child_process').spawn;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('landing', {
    title: 'CPP Editor+Formatter',
  });
});

router.get('/editor', function (req, res, next) {
  res.render('editor', {
    title: 'CPP Editor',
  });
});

router.post('/format', function (req, res, next) {
  console.log(req.body);
  //console.log(req.body.code);
  console.log(req.body.style);
  cfprocess = spawn('clang-format', ["-style=" + req.body.style]);
  cfprocess.on('error', function(err) {
    res.status(500).send("error occurred <br> the package may not be installed");
  });
  data = req.body.code;
  dataString = '';
  cfprocess.stdin.write(data);
  cfprocess.stdin.end();

  cfprocess.stdout.on('data', function (data) {
    dataString += data.toString();
  });
  cfprocess.stdout.on('end', function () {
    console.log(dataString);
    res.send(dataString);
  });


});

router.get('/light', function (req, res, next) {
  res.render('light-format', {
    title: 'CPP Formatter',
    codebuffer: ""
  });
});

router.post('/light', function (req, res, next) {
  //console.log(req.body);
  //console.log(req.body.code);
  console.log(req.body.style);
  cfprocess = spawn('clang-format', ["-style=" + req.body.style]);
  cfprocess.on('error', function(err) {
    res.status(500).send("error occurred <br> the package may not be installed");
  });
  data = req.body.code;
  dataString = '';
  cfprocess.stdin.write(data);
  cfprocess.stdin.end();

  cfprocess.stdout.on('data', function (data) {
    dataString += data.toString();
  });
  cfprocess.stdout.on('end', function () {
    console.log("out: " + dataString);
    res.render('light-format', {
      title: 'CPP Formatter',
      codebuffer: dataString,
      buff2: dataString,
    });
  });


});

module.exports = router;
