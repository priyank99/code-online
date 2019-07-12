const express = require('express');
const router = express.Router();
//const spawn = require('child_process').spawn;
const child_process = require('child_process');
const fs = require('fs-extra')

router.get('/', function (req, res, next) {
    res.render('run-editor', {
      title: 'Run Code',
    });
});

router.post('/cpp', function (req, res, next) {
    console.log(req.body);
    console.log(req.body.code);
    let fname_timestamp = Date.now();
    code_string = req.body.code;
    root_path = "./temp/cpp/";
    fpath =  root_path + fname_timestamp;
    let cppfile = fpath + '.cpp';
    console.log(fname_timestamp);
    let response = {};

    fs.writeFile(cppfile, code_string, function(err) {
        if(err) {
            console.log(err);
            return res.status(502).send("Internal error occurred - store")
        }
        console.log("The file was saved!");
    });

    let extcall = 'g++ -std=c++11 ' + cppfile +' -o '+ fpath + ' && time timeout -k 1s 2s '+fpath;
    console.log("input= " + extcall)
    child_process.exec(extcall, function (err, stdout, stderr){
        if (err) {
            console.log("child processes failed with error code: " + err.code);
            if(err.code == 1){
                response.err = "compilation error";
                response.stderr = stderr;
            }
            else if(err.code == 124){
                response.err = "Time limit exceeded";
            }
            else if(err.code == 139){
                response.err = "Segmentation fault";
            }
            return res.send(response);
        }
        else{
            response.status = "Executed successfully";
            response.stdout = stdout;
            response.time = stderr.substr(0,4);
            fs.unlink(fpath);
            fs.unlink(cppfile);
            console.log(stderr.substr(0,4))
            //console.log(stdout)
            return res.send(response);
        }
        
    });
    
});


router.post('/py', function (req, res, next) {
    console.log(req.body);
    console.log(req.body.code);
    let fname_timestamp = Date.now();
    code_string = req.body.code;
    root_path = "./temp/py/";
    fpath =  root_path + fname_timestamp;
    let pyfile = fpath + '.py';
    console.log(fname_timestamp);
    let response = {};

    fs.writeFile(pyfile, code_string, function(err) {
        if(err) {
            console.log(err);
            return res.status(502).send("Internal error occurred - store")
        }
        console.log("The file was saved!");
    });

    let extcall = 'time timeout -k 1s 5s python ' + pyfile;
    console.log("input= " + extcall)
    child_process.exec(extcall, function (err, stdout, stderr){
        if (err) {
            console.log("child processes failed with error code: " + err.code);
            if(err.code == 1){
                response.err = "compilation error";
                response.stderr = stderr;
            }
            else if(err.code == 124){
                response.err = "Time limit exceeded";
            }
            else if(err.code == 139){
                response.err = "Segmentation fault";
            }
            return res.send(response);
        }
        else{
            response.status = "Executed successfully";
            response.stdout = stdout;
            response.time = stderr.substr(0,4);
            fs.unlink(pyfile);
            console.log(stderr.substr(0,4))
            //console.log(stdout)
            return res.send(response);
        }
        
    });
    
});
module.exports = router;
