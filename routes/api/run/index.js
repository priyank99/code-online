const debug = require('debug')('app:progexec')
const express = require('express');
const router = express.Router();

const cppRun = require('./lang_cpp').runCode
const py3Run = require('./lang_py').runCode

router.get('/', function (req, res, next) {
    debug('home')
    res.render('run-editor', {
      title: 'Run Code',
    });
});

router.post('/cpp', async function (req, res, next) {
    // debug(req.body);
    let resp = cppRun(req.body.code).then( 
        (response) => {
            debug(response);     
            return res.send(response);
        }
    
    );
});

router.post('/py', async function (req, res, next) {
    // debug(req.body);
    let resp = py3Run(req.body.code).then( 
        (response) => {
            debug(response);
            return res.send(response);
        }
    
    );
});


module.exports = router;
