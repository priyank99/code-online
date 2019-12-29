const debug = require('debug')('app:progexec:cpp')
const fs = require('fs-extra')
// const { exec } = require('child_process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const getUniqueFilename = require('./utils').getUniqueFilename


async function runCode(code_string){
    /* 
        makes temporary file and runs the code
    */
    let response = {};
    response.err = '0';

    // make file
    time_limit = 2;
    root_path = "./temp/sc/cpp/";
    // debug('code_string=', code_string)

    let fstring = getUniqueFilename();
    fpath =  root_path + fstring;
    let cppfile = fpath + '.cpp';
    debug('filename=', cppfile)

    try {
        await fs.writeFile(cppfile, code_string)
        debug("The file was saved!");    
    } 
    catch (err) {
        if(err) {
            debug(err);
            response = {}
            response.status = 'Not executed'
            response.err = '-1'
            return response;
        }
    }

    let extcall = 'g++ -std=c++11 ' + cppfile +' -o '+ fpath + 
        ' && time timeout -k 1s ' +time_limit+'s ' + fpath;
        // + ' && ls -l ' + cppfile;


    debug("command= ", extcall)

    try {
        const { stdout, stderr } = await exec(extcall);
        debug("stdout: ", stdout)
        debug("stderr", stderr)

        response.status = "Executed successfully";
        response.stdout = stdout;
        response.time = stderr.substr(0,4);
        
        fs.unlink(cppfile);
        fs.unlink(fpath);
        debug(response);
        return response;   

    } catch (error) {

        debug("stdout: ", error.stdout)
        debug("stderr", error.stderr)

        debug(cppfile)
        debug(response)

        debug("child processes failed with error code: " + error.code);
        if(error.code == 1){
            response.err = "Compilation error";
            response.stderr = error.stderr;
            fs.unlink(cppfile);
            return response;
        }
        else if(error.code == 124){
            response.err = "Time limit exceeded";
        }
        else if(error.code == 139){
            response.err = "Segmentation fault";
        }

        fs.unlink(cppfile);
        fs.unlink(fpath);
        return response;
    }

}


async function cbrunCode(code_string){
    /* 
        makes temporary file and runs the code
    */
    let response = {};
    response.err = '0';

    // make file
    time_limit = 2;
    root_path = "./temp/sc/cpp/";
    debug('code_string=', code_string)

    let fstring = getUniqueFilename();
    fpath =  root_path + fstring;
    let cppfile = fpath + '.cpp';
    debug('filename=', cppfile)

    try {
        let fsp = await fs.writeFile(cppfile, code_string)
        debug("The file was saved!");    
    } 
    catch (err) {
        debug(err);
        response = {}
        response.status = 'Not executed'
        response.err = '-1'
        return response;

    }

    let extcall = 'g++ -std=c++11 ' + cppfile +' -o '+ fpath + 
        ' && time timeout -k 1s ' +time_limit+'s ' + fpath;
        // + ' && ls -l ' + cppfile;


    debug("command= ", extcall)

    let chproc = await exec(extcall, function (error, stdout, stderr){
        if (error) {

            debug("child processes failed with error code: " + error.code);
            if(error.code == 1){
                response.err = "Compilation error";
                response.stderr = stderr;
                fs.unlink(cppfile);
                console.log(error);
                debug(response);
                return response;
            }
            else if(error.code == 124){
                response.err = "Time limit exceeded";
            }
            else if(error.code == 139){
                response.err = "Segmentation fault";
            }
    
            fs.unlink(cppfile);
            fs.unlink(fpath);
            return response;

        }
        else{
            response.status = "Executed successfully";
            response.stdout = stdout;
            response.time = stderr.substr(0,4);
            debug(stderr.substr(0,4))

            debug("stdout: ", stdout)
            debug("stderr", stderr)
    
            debug("else cpp")

            // return response;  
        }
    });

    chproc.on('exit', () => {
        response.status = "Executed successfully";
        response.stdout = stdout;
        response.time = stderr.substr(0,4);
        debug(stderr.substr(0,4))

        debug("stdout: ", stdout)
        debug("stderr", stderr)

        debug(cppfile)
        fs.unlink(cppfile);
        fs.unlink(fpath);
        debug(response);
        return response;  
    })
}


module.exports = {runCode}

/*

#include<iostream.h>

int main(){
    cout<<"Hello\n";
}

*/