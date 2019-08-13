const router = require("express").Router();

const toolsRouter = require('./tools');
const programExecRouter = require('./api/run');
const usersRouter = require('./users');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('landing');
});

router.use('/tools', toolsRouter);
router.use('/run', programExecRouter);
router.use('/user', usersRouter);

module.exports = router;