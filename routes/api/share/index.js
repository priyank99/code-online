const debug = require('debug')('app:share'),
    express = require('express'),
    router = express.Router();

const { 
        saveCode,
        getCodeById,
        getCodeByUrl,
        getAllCode,
        delCodeById
    } = require('./code')

router.get('/', function (req, res, next) {
    debug('home')
    res.send("API : share");
});

router.get('/code', async function (req, res, next) {
    debug("get all");
    debug(req.body);
    let resp = getAllCode().then( 
        (response) => {
            debug(response); 
            if(response){
                return res.send(response);
            }    
            else{
                return res.status(404).send(response);
            }
        }
    );
});

router.post('/code', async function (req, res, next) {
    debug(req.body);
    let resp = saveCode(req.body).then( 
        (response) => {
            debug(response); 
            if(response){
                return res.send(response);
            }    
            else{
                return res.status(500).send(response);
            }
        }
    );
});

router.get('/code/:id', async function (req, res, next) {
    debug("get by id");
    debug(req.body);
    let resp = getCodeById(req.params.id).then( 
        (response) => {
            debug(response); 
            if(response){
                return res.send(response);
            }    
            else{
                return res.status(404).send(response);
            }
        }
    );
});
router.delete('/code/:id', async function (req, res, next) {
    debug("del by id");
    debug(req.params.id);
    let resp = delCodeById(req.params.id).then( 
        (response) => {
            debug(response); 
            if(response){
                return res.send(response);
            }    
            else{
                return res.status(404).send(response);
            }
        }
    );
});
router.get('/c/:id', async function (req, res, next) {
    debug("get by id");
    debug(req.body);
    let resp = getCodeByUrl(req.params.id).then( 
        (response) => {
            debug(response); 
            if(response){
                return res.send(response);
            }    
            else{
                return res.status(404).send(response);
            }
        }
    );
});

module.exports = router;
