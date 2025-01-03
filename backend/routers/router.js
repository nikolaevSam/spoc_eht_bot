const router = require('express').Router();

const NotFoundError = require('../errors/NotFoundError');
const circuitsRouter = require('./circuits');
const modulesRouter = require('./modules');

router.use('/circuits', circuitsRouter);
router.use('/modules', modulesRouter);
router.use('/*', () => {
    throw new NotFoundError('Not Found');
});

module.exports = router;