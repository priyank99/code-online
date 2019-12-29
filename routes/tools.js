const express = require('express');
const router = express.Router();
const spawn = require('child_process').spawn;
const debug = require('debug')('app:tools')

/* GET home page. */
router.get('/', function (req, res, next) {
    debug('Homepage');
    res.redirect('/');
});

router.get('/editor', function (req, res, next) {
    res.render('editor', {
        title: 'CPP Editor',
    });
});

router.post('/format', function (req, res, next) {
    debug(req.body);
    cfprocess = spawn('clang-format', ["-style=" + req.body.style]);
    cfprocess.on('error', function (err) {
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
        debug(dataString);
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
    debug(req.body);
    debug('Style: ' + req.body.style);
    cfprocess = spawn('clang-format', ["-style=" + req.body.style]);
    cfprocess.on('error', function (err) {
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
        debug("out: " + dataString);
        res.render('light-format', {
            title: 'CPP Formatter',
            codebuffer: dataString,
            buff2: dataString,
        });
    });


});

module.exports = router;
