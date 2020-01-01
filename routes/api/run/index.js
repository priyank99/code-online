const debug = require('debug')('app:progexec')
const express = require('express');
const router = express.Router();

const cppRun = require('./lang_cpp').runCode
const py3Run = require('./lang_py').runCode
const {Language} = require('../../../database/models/languages')

router.get('/', function (req, res, next) {
    debug('home')
    res.render('run-editor', {
      title: 'Run Code',
    });
});

router.post('/', async function (req, res, next) {
    debug(req.body);

    let autoRun = py3Run;
    switch (req.body.language) {
        case Language.Py3: 
            autoRun = py3Run;
            break;
        case Language.Cpp: 
            autoRun = cppRun;
            break;
        case Language.C: 
            autoRun = cppRun;
            break;
        default: 
            return res.status(400).send("Bad Request");
            break;
    }
    
    autoRun(req.body.code).then( 
        (response) => {
            // debug(response);     
            return res.send(response);
        }
    );
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
