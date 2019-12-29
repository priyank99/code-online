
function getTimestamp(){
    return ( ""  + Date.now() ) ;
}
function getUniqueFilename(){
    return ( "" + Date.now() + Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2) ) ;
}


module.exports = {  getUniqueFilename } 