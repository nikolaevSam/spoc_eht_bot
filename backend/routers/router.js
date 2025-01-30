const router = require('express').Router();

const NotFoundError = require('../errors/NotFoundError');
const circuitsRouter = require('./circuits');
const modulesRouter = require('./modules');
const usersRouter = require('./users');
const sisesRouter = require('./sises');

router.use('/circuits', circuitsRouter);
router.use('/modules', modulesRouter);
router.use('/users', usersRouter);
router.use('/sises', sisesRouter);
router.use('/*', () => {
    throw new NotFoundError('Not Found');
});

module.exports = router;