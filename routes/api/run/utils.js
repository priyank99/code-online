const generate = require('nanoid/generate');

function getNanoId10(){
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let nid = generate(alphabet, 10);
    return nid;
}
function getNanoId20(){
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let nid = generate(alphabet, 20);
    return nid;
}

function getTimestamp(){
    return ( ""  + Date.now() ) ;
}
function getUniqueFilename(){
    return ( "" + Date.now() + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) ) ;
}
function getUniqueFilename20(){
    return getNanoId20();
}

function testGenerator(generator, n){
    for(let i=0; i<n; i+=1){
        let rn = generator();
        console.log(rn);
    }
}
// testGenerator(getUniqueFilename, 10);

module.exports = {  getUniqueFilename, getNanoId10, getNanoId20 } 