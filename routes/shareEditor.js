const express = require('express');
const router = express.Router();
const debug = require('debug')('app:shared')
const {getCodeByUrl} = require('./api/share/code')
/* GET Editor page. */
router.get('/', function (req, res, next) {
    debug('page: Shared Editor');
    return res.render('shared-editor', {
        title: 'Shared Editor',
        header: 'Shared Editor',
    });
});

router.get('/:id', async function (req, res, next) {
    debug('page: Shared Editor', req.params.id);
    try{
        let doc = await getCodeByUrl(req.params.id)

        debug(doc.code_text)
        return res.render('shared-editor', {
            title: 'Shared Editor-'+doc.url,
            header: 'Shared Editor',
            code_id: doc.url 
        });
    }
    catch(err){
        debug("err : shared doc not found");
        debug(err);
        next(err);
    }
});

module.exports = router;
