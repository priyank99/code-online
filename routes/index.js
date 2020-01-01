const router = require("express").Router();

const toolsRouter = require('./tools');
const programExecRouter = require('./api/run');
const programShareRouter = require('./api/share');
const usersRouter = require('./users');
const shareEditRouter = require('./shareEditor');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('landing');
});

router.use('/tools', toolsRouter);
router.use('/api/run', programExecRouter);
router.use('/api/share', programShareRouter);
router.use('/run', programExecRouter);
router.use('/shared', shareEditRouter);
router.use('/user', usersRouter);

module.exports = router;