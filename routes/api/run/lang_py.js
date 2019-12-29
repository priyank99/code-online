const debug = require('debug')('app:progexec:py')
const fs = require('fs-extra')
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
    root_path = "./temp/sc/py/";
    debug('code_string=', code_string)

    let fstring = getUniqueFilename();
    fpath =  root_path + fstring;
    let pyfile = fpath + '.py';
    debug('filename=', pyfile)

    try {
        await fs.writeFile(pyfile, code_string)
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

    let extcall = 'time timeout -k 1s '+time_limit+'s python ' + pyfile;

    debug("command= ", extcall)

    try {
        const { stdout, stderr } = await exec(extcall);
        response.status = "Executed successfully";
        response.stdout = stdout;
        response.time = stderr.substr(0,4);
        debug(stderr.substr(0,4))

        debug("stdout: ", stdout)
        debug("stderr", stderr)

        debug(pyfile)
        fs.unlink(pyfile);
        debug(response);
        return response;   

    } catch (error) {

        debug("catched error in py3run: ")
        // debug("stdout: ", error.stdout)
        // debug("stderr", error.stderr)

        let stderrLines = error.stderr
        let resErr = stderrLines.split('\n').slice(0, -3).join("\n")
        let resTime = stderrLines.split('\n').splice(-3, 1).join().substr(0,4)

        // debug(resErr)
        // debug(resTime)

        debug(pyfile)
        
        debug("child processes failed with error code: " + error.code);
        if(error.code == 1){
            response.err = "Compilation error";
            response.stderr = resErr;
        }
        else if(error.code == 124){
            response.err = "Time limit exceeded";
        }
        else if(error.code == 139){
            response.err = "Segmentation fault";
        }
        
        fs.unlink(pyfile);
        debug(response)
        return response;
    }

}


module.exports = {runCode}

/*

#include<iostream.h>

int main(){
    cout<<"Hello\n";
}

*/