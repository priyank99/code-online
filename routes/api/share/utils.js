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

function testGenerator(generator, n){
    for(let i=0; i<n; i+=1){
        let rn = generator();
        console.log(rn);
    }
}
// testGenerator(getUniqueFilename, 10);

module.exports = { getNanoId10, getNanoId20 } 